const Product =require("../models/productModel");
const path = require('path');
const fs = require('fs');
const {validationResult} =require('express-validator')

// const imagePath = path.join(__dirname, 'image.jpeg');
//const imageBuffer = fs.readFileSync(path.resolve("image.jpeg"));

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ error: errors.errors[0].msg})
        }
        let data = req.body;
        // console.log(data);
        const newProduct = await  new Product(data).save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const getAProductById = async (req, res) => {
    try {   
        const id = req.params.id;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

// {new : true} updated product will return
const updateProduct = async (req, res) => {
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ error: errors.errors[0].msg})
        }
        const id = req.params.id;
        const data = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, data, {new : true});
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const addReview = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.errors[0].msg })
        }
        const {productId} = req.params
        console.log(productId)
        const {_id, username} = req.user;
        const {message, rating} = req.body;
        const review = {
            userId : _id,
            username,
            message,
            rating,
        }
        const existingProduct = await Product.findById(productId);
        if(!existingProduct){
            return res.status(404).json({message : "Product not found"})
        }

        const {reviews} = existingProduct;
        const newReviews = [...reviews, review]
        const newRating = reviews.length !== 0 ? newReviews.reduce((acc, curItem) => acc + curItem.rating, 0) / newReviews.length : rating;
        const updatedProduct = await Product.findByIdAndUpdate({_id : productId}, {
            $set : {rating : newRating, numOfReviews : newReviews.length},
            $push : {reviews : review}
        }, {new : true})

        return res.status(201).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports={getAllProducts,createProduct,getAProductById,updateProduct,deleteProduct,addReview}