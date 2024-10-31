const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const Shop = require("./models/shoplist");
const UserModel = require("./models/userdetails");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/users");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const saltRounds = 10;

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registered : " + username);
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please provide name, email, and password." });
    }
    try {
        const existingEmail = await UserModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(200).json({ error: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/shopregister", upload.array('photos', 10), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { shopname, location, shoptype, mobilenumber, email, opentime, closetime } = req.body;
        const services = JSON.parse(req.body.services);
        const imagePaths = req.files.map(file => file.path); // Array of file paths for uploaded images

        const shop = new Shop({
            shopname,
            location,
            shoptype,
            mobilenumber,
            email,
            opentime,
            closetime,
            images: imagePaths,
            services
        });

        await shop.save();

        res.status(201).json({
            message: "Shop created successfully",
            shop
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Error creating shop",
            error
        });
    }
});

app.post('/shop/:id/comment', async function (req, res) {
    const { id } = req.params;
    const { comment } = req.body;

    await new Comment({
        shopId: id,
        comment
    }).save();

    res.status(201).json({ message: "Comment added" });
});

app.get('/shop/:id', function (req, res) {
    try {
        const { id } = req.params;
        const shop = Shop.findOne({ _id: id });
        const comments = Comment.find({ shopId: id });
        res
            .status(200)
            .json({ shop, comments });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/shoplist", async (req, res) => {
    try {
        const userLocation = req.body.location;
        const shops = await Shop.find({ location: userLocation });
        res.status(200).json({ shops });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(3001, () => console.log(`server running on ${3001}`));