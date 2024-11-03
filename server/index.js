const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const Shop = require("./models/shoplist");
const UserModel = require("./models/userdetails");
const Comments = require('./models/comments');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Configure multer for file uploads
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

// User registration
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
        res.status(200).json({ message: "User registered successfully" });
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
        res.status(200).json({ message: "Login successful", isAdmin : user.role === 'admin', email: user.email });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Shop registration
app.post("/shopregister", upload.array('photos', 10), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { shopname, location, shoptype, mobilenumber, email, opentime, closetime, userEmail, services, about } = req.body;
        const imagePaths = req.files.map(file => file.path); // Array of file paths for uploaded images
        const parsedServices = JSON.parse(services); // Parse services JSON

        const shop = new Shop({
            shopname,
            location,
            shoptype,
            mobilenumber,
            email,
            about,
            opentime,
            closetime,
            userEmail,
            images: imagePaths,
            services: parsedServices
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

// Add comment to a shop
app.post('/shop/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { comment, rating, email } = req.body;

    try {
        const { username } = await UserModel.findOne({ email }).select('username');
        // Save the comment to the Comments collection
        await new Comments({
            shopId: id,
            comment,
            rating,
            username
        }).save();

        // Find the shop and get its current ratings
        const shop = await Shop.findById(id).select('rating');
        
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // Add the new rating to the current ratings
        shop.rating.push(rating);
        
        // Calculate the new average rating
        const averageRating = shop.rating.reduce((sum, rate) => sum + rate, 0) / shop.rating.length;

        // Update the shop's average rating in the database
        await Shop.findByIdAndUpdate(id, { rating: shop.rating, averageRating }, { new: true });

        res.status(201).json({ message: "Comment added", averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/shop/:id', async function (req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        const shop = await Shop.findById(id);
        const comments = await Comments.find({ shopId: id });

        // Construct the image URLs
        const imageUrls = shop.images.map(imagePath => {
            return `${req.protocol}://${req.get('host')}/uploads/${path.basename(imagePath)}`;
        });

        res.status(200).json({
            shop: { ...shop._doc, images: imageUrls }, // Add image URLs to the shop data
            comments
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


// Get all shops by location
app.get("/shops/:location", async (req, res) => {
    try {
        const location = req.params.location || "not found";
        const shops = await Shop.find({ location });
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get all shops
app.get("/shops", async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/user/shop", async (req, res) => {
    try {
        const shops = await Shop.find({ userEmail: req.query.email });
        
        // Map through the shops to create image URLs
        const shopsWithImages = shops.map(shop => {
            return {
                ...shop.toObject(), // Convert Mongoose document to plain object
                images: shop.images.map(imagePath => {
                    return `${req.protocol}://${req.get('host')}/uploads/${path.basename(imagePath)}`;
                })
            };
        });

        res.status(200).json(shopsWithImages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update a shop
app.put("/shop/:_id", async (req, res) => {
    const { _id } = req.params;
    console.log("Updated : " + _id);
    try {
        const updatedData = req.body;

        const updatedShop = await Shop.findByIdAndUpdate(_id, updatedData, { new: true });
        console.log("Updated : ", updatedShop);
        res.status(200).json(updatedShop);
    } catch (error) {
        console.error("Error updating shop:", error);
        res.status(500).json({ error: "Error updating shop" });
    }
});

// Delete a shop
app.delete("/shop/:_id", async (req, res) => {
    const { _id } = req.params;
    console.log("Deleted : " + _id);
    try {
        const data = await Shop.findByIdAndDelete(_id);
        console.log("Deleted : " + data);
        res.status(200).json({ message: "Shop deleted successfully" });
    } catch (error) {
        console.error("Error deleting shop:", error);
        res.status(500).json({ error: "Error deleting shop" });
    }
});

// Delete a service from a shop
app.delete("/shop/:shopId/service/:serviceIndex", async (req, res) => {
    const { shopId, serviceIndex } = req.params;

    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ error: "Shop not found" });
        }

        // Remove the service at the specified index
        shop.services.splice(serviceIndex, 1);
        await shop.save();

        res.status(200).json({ message: "Service deleted successfully", services: shop.services });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ error: "Error deleting service" });
    }
});

// Start the server
app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`);
});
