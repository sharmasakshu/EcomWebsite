const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    
    items : [{
        productId : {
            type :mongoose.Schema.Types.ObjectId,
            required : true ,
        },
        productImage : {
            type : String,
            required : true
        },
        productName : {
            type : String,
            required : true,
        },
        brand : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true,
        },
        qty : {
            type : Number,
            required : true,
        }
    }]
}, {
    timestamps : true
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;