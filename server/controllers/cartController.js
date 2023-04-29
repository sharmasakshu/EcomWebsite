/* This code exports two functions `getUserCart` and `createUserCart` that handle requests related to a
user's cart. The `const Cart = require("../models/cartModel")` line imports the `cartModel` module
which is used to interact with the database and perform CRUD operations on the cart collection. The
`getUserCart` function retrieves the cart for the currently authenticated user and returns it as a
JSON response. The `createUserCart` function creates a new cart for the user if one does not already
exist and returns a success message. If a cart already exists for the user, it returns an error
message. */
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
        const {_id} = req.user;
        const data = req.body;
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

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports={getUserCart,createUserCart,addToCart}