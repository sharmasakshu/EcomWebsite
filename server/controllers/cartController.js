const {validationResult} =require('express-validator')
const Cart = require("../models/cartModel")

const getUserCart = async (req, res) => {
    try {
        const {_id} = req.user;
        const cart = await Cart.findOne({userId : _id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
const createUserCart = async (req, res) => {
    try {
        const {_id} = req.user;
        const existingCart = await Cart.findOne({userId : _id});
        if(existingCart){
            return res.status(400).json({message : "Cart already exists"})
        }
        await Cart({
            userId : _id,
            items : []
        }).save()
        return res.status(201).json({message : "Cart successfully Created"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const addToCart = async  (req,res) => {
    try {
       /* `const errors = validationResult(req)` is using the `validationResult` function from the
       `express-validator` library to validate the request body and check if there are any errors. */
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ error: errors.errors[0].msg})
        }
        const {_id} = req.user;
        const data = req.body;
        console.log(data);
        const result = await Cart.updateOne({userId : _id, "items.productId" : data.productId }, {
            $set : {"items.$.qty" : data.qty}
         
        })
       
        if(result.modifiedCount !== 1){
            const result = await Cart.updateOne({userId : _id}, {
                $push : {items : data}
            })
            if(result.modifiedCount === 0){
                return res.status(500).json({message : "Item cannot be added to Cart."})
            }
        }

        const cart = await Cart.findOne({userId : _id});
        return res.status(200).json(cart);
        // return res.status(200);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteItem = async  (req,res) => {
    try {
        
        const {_id} = req.user;
        const {productId} = req.params;
        console.log(productId);
      
            /* This code is deleting an item from the user's cart. It uses the `updateOne` method from
            the `Cart` model to find the cart with the matching `userId` and `productId` and remove
            the item from the `items` array using the `` operator. The `result.modifiedCount`
            property is then checked to see if the item was successfully deleted. If it was not, a
            500 error response is sent to the client. */
            const result = await Cart.updateOne({userId : _id , "items.productId" : productId }, {
                $pull : {items : {productId:productId}}
            })
            console.log(result.modifiedCount)
            if(result.modifiedCount === 0){
                return res.status(500).json({message : "Item cannot be deleted from the Cart."})
            }
      
        const cart = await Cart.findOne({userId : _id});  
        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports={getUserCart,createUserCart,addToCart, deleteItem}