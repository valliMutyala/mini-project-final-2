const mongoose=require('mongoose')

const shopListSchema=new mongoose.Schema({
    shop_name:{type:String,required:true},
    location:{type:String,required:true},
    shop_type:{type:String,required:true},
    shop_image:{type:String},
    mobile_number:{type:String,required:true},
    email:{type:String,required:true},
    open_time:{type:String,required:true},
    close_time:{type:String,required:true},
    service:[String],
    price:{type:String}

})

const Shop=mongoose.model('Shop',shopListSchema)
module.exports=Shop