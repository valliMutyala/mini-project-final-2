const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const app=express()
const UserModel=require('./models/userdetails')
const Shop=require('./models/shoplist')


mongoose.connect('mongodb://localhost:27017/users');

app.use(express.json())

app.use(cors()) 
app.use(express.urlencoded({ extended: true }));

const saltRounds = 10;

app.post('/register', async (req,res)=>{
    const {username,email,password}=req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password.' });
      }
    try{
        const existingEmail=await UserModel.findOne({email})
        
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


app.post('/shopregister',async(req,res)=>{
    const {images} = req.body;
    console.log(images)
    // const newShop=new Shop(req.body);
    // try{
    //     const savedShop =await newShop.save();
    //     res.status(201).json(savedShop)
    // }catch(err){
    //     res.status(400).json({message:err.message})
    // }
})


app.listen(3000, () => console.log("server running")); 