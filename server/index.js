const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const app=express()
const multer=require('multer')
const UserModel=require('./models/userdetails')
const Shop=require('./models/shoplist')


mongoose.connect('mongodb://localhost:27017/users');

app.use(express.json())

app.use('/uploads', express.static('uploads'));
app.use(cors()) 
app.use(express.urlencoded({ extended: true }));
// const storage=multer.memoryStorage();
// const upload=multer({storage:storage});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');  // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const saltRounds = 10;

app.post('/register', async (req,res)=>{
    const {username,email,password}=req.body;
    console.log("Registered : " + username )
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password.' });
      }
    try{
        const existingEmail= await UserModel.findOne({email})
        
        if(existingEmail){
            return res.status(400).json({message: 'Email is already registered'})
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser=new UserModel({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()

        res.status(200).json({error:'User register successfully'})
    }catch(error){
        res.status(500).json({error:'Server Error'})
    }
})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({error:'Incorrect password'})
        }
        res.status(200).json({message:'Login successful',user})
    }catch(err){
        res.status(500).json({error:'Server error'})
    }

});


app.post('/shopregister',upload.array('shopimages',10),async(req,res)=>{

    try{
        const images=req.files.map(file=>({
            data:file.buffer, 
            contentType: file.mimetype,
        }))
        const services=req.body;

        if (services && !Array.isArray(services)) {
            services = [services];
          }
        
          // Ensure 'services' is now an array
          if (!services || !Array.isArray(services)) {
            return res.status(400).json({ message: "'services' must be an array or a valid object" });
          }
        
          // Process services array
          const processedServices = services.map(service => ({
            name: service.name,
            price: service.price,
          }));

        const newShop=new Shop({
            shopname:req.body.shopname,
            location:req.body.location,
            shoptype:req.body.shoptype,
            shopimages:images,
            mobilenumber:req.body.mobilenumber,
            email:req.body.email,
            opentime:req.body.opentime,
            closetime:req.body.closetime,
            services:processedServices,

        })
        const savedShop =await newShop.save();
        res.status(201).json(savedShop)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


// Route to create a new shop with multiple images and services with prices
app.post('/create', upload.array('images', 10), async (req, res) => {
    try {
        // Array of image paths
        const imagePaths = req.files.map(file => file.path);

        // Parse the services and prices array from the request body
        const servicesWithPrices = JSON.parse(req.body.services); // Expecting an array of objects

        // Create new shop entry
        const newShop = new Shop({
            shopname: req.body.shopname,
            location: req.body.location,
            shoptype: req.body.shoptype,
            images: imagePaths,
            mobilenumber: req.body.mobilenumber,
            email: req.body.email,
            opentime: req.body.opentime,
            closetime: req.body.closetime,
            services: servicesWithPrices
        });

        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shop', error });
    }
});
 

app.listen(3001, () => console.log(`server running on ${3001}`)); 