const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/userdetails");
const Shop = require("./models/shoplist");
const multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/users");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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

app.post("/shopregister",upload.fields([{ name: 'images' }, { name: 'photos' }]), async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        const { shopname, location, shoptype, mobilenumber, email, opentime, closetime } = req.body;

        const shop = new Shop({ 
            shopname, 
            location, 
            shoptype, 
            mobilenumber, 
            email, 
            opentime, 
            closetime,
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

app.listen(3001, () => console.log(`server running on ${3001}`));