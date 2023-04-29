const express = require('express');
const {getUserCart, createUserCart, addToCart} = require("../controllers/cartController")
const { verifyUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get("/", verifyUser, getUserCart)
router.post("/createCart", verifyUser, createUserCart)
router.post("/addToCart", verifyUser, addToCart)

module.exports = router