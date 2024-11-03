const mongoose=require("mongoose")

const UserdetailsSchema =new mongoose.Schema( {
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"user"},
});

const UserModel=mongoose.model('registers',UserdetailsSchema)
module.exports=UserModel

