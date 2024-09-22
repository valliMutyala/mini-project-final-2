const mongoose=require('mongoose')
// const serviceSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   price: {
  //     type: Number,
  //     required: true,
  //   }
  // });

const shopListSchema=new mongoose.Schema({
    shopname:{type:String,required:true},
    location:{type:String,required:true}, 
    shoptype:{type:String,required:true}, 
    // shopimage:[{data:Buffer,contentType:String}],
    shopimage: [{ type: String }],
    mobilenumber:{type:String,required:true},
    email:{type:String,required:true},
    opentime:{type:String,required:true},
    closetime:{type:String,required:true},
    services:[{
      serviceName: { type: String, required: true },
      price: { type: Number, required: true }
  }]
})

const Shop=mongoose.model('Shop',shopListSchema)
module.exports=Shop