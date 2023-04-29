const Product =require("../models/productModel");
const path = require('path');
const fs = require('fs');

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

const updateProduct = async (req, res) => {
    try {
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

module.exports={getAllProducts,createProduct,getAProductById,updateProduct,deleteProduct}