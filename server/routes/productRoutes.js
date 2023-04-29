const {Router} =require("express");
const { createProduct, deleteProduct, getAProductById, getAllProducts, updateProduct } =require("../controllers/productController.js");
const { verifyAdmin } = require('../middlewares/authMiddleware.js');

const routes=Router();

routes.get("/", getAllProducts )
routes.post("/create",verifyAdmin,createProduct )
routes.get("/:id", getAProductById )

routes.put("/update/:id", verifyAdmin,updateProduct )

routes.delete("/delete/:id",verifyAdmin, deleteProduct)

module.exports=routes;