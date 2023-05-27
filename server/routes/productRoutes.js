const {Router} =require("express");
const { createProduct, deleteProduct, getAProductById, getAllProducts, updateProduct ,addReview} =require("../controllers/productController.js");
const { verifyAdmin, verifyUser } = require('../middlewares/authMiddleware.js');
const { check } = require('express-validator');

const routes=Router();

const productValidation = [
    check('name').notEmpty().withMessage("Product Name is Required").trim(),
    check('image').notEmpty().withMessage("Product Image is Required").trim(),
    check('brand').notEmpty().withMessage("Product Brand is Required").trim(),
    check('description').notEmpty().withMessage("Product Description is Required").trim(),
    check('category').notEmpty().withMessage("Product Category is Required").trim(),
    check('price').notEmpty().withMessage("Product Price is Required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Price should be of number type"),
    check('countInStock').notEmpty().withMessage("Product Count in Stock is Required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Count in Stock should be of number type"),
]

const reviewValidation = [
    check("message").notEmpty().withMessage("Message is required").isLength({
        min : 20,
        max : 80
    }).withMessage("Message should be greater than 20 and less than 80"),
    check("rating").notEmpty().withMessage("Rating is required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Rating should be of number type")
]

routes.get("/", getAllProducts )
routes.post("/create",verifyUser ,verifyAdmin,productValidation,createProduct )
routes.get("/:id", getAProductById )
routes.put("/update/:id",verifyUser,verifyAdmin,productValidation,updateProduct )
routes.delete("/delete/:id",verifyUser,verifyAdmin, deleteProduct)
routes.put("/addReview/:productId",verifyUser,reviewValidation,reviewValidation, addReview)

module.exports=routes;