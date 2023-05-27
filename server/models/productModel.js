const mongoose = require('mongoose');
const reviewSchema ={
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        unique:true,
        required : true,
    },
     username : {
        type : String,
        required : true, 
    }, 
     rating: {
        type: Number,
        required:true,
    },
        message:{
        type:String,
        required:true,
    }

}
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true,
        trim: true,
    },
    price : {
        type : Number,
        required : true,
    },
    brand : {
        type : String,
        required : true,
        trim: true,
    },
    category : {
        type : String,
        enum:["Mobile Phones", "PCs and Laptops","Cameras","Watches"],
        required : true,
        trim: true,
    },
    description : {
        type : String,
        required:true,
        trim: true,
    },
    featured :{
        type: Boolean,
        default:false,
    },
    image :{
        type : String,
        required: true,
    },
    countInStock:{
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default:0,
    },
    reviews:[reviewSchema], 
    numOfReviews:{
        type: Number,
        default:0,
    }
})

const Product = mongoose.model("product", productSchema);
module.exports=Product;

