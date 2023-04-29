const mongoose = require('mongoose');

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
        required : true,
        trim: true,
    },
    description : {
        type : String,
        default : "Default description",
        trim: true,
    },
    featured :{
        type: Boolean,
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
    }
  
})

const Product = mongoose.model("product", productSchema);
module.exports=Product;