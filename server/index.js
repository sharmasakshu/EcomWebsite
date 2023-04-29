const express = require('express')
// const path=require("path");
const app = express()
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const userRoutes =require('./routes/userRoutes')
const productRoutes =require('./routes/productRoutes');
const cartRoutes =require('./routes/cartRoutes')

const cors=require('cors');

dotenv.config();

app.use(express.json()); 
app.use(cors());

app.use('/api/v1/products',productRoutes);
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/cart',cartRoutes)

app.get('/',(req,res)=>{
  res.send("Welcome to my Home");
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT} and connected to database`)
  })
  }).catch(err=>console.log(err));