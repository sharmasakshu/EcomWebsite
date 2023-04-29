import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { fetchSingleProduct } from '../slices/singleProductSlice';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { Grid, Paper, Box, Typography, Button, Rating } from "@mui/material";
import { addToCart } from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SingleProduct = () => {

  const {product} =useSelector((state)=> state.singleProduct);
  const {user}=useSelector((state)=> state.userstate);
  const {cart} =useSelector((state)=> state.cart);
  console.log(cart?.items)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {_id}= useParams();
  useEffect(() => {
     _id && dispatch(fetchSingleProduct(_id));
  
  }, [])

 
  const handleCart =()=>{
    if (user) {
      let cartItem = {
        productId: product?._id,
        productName: product?.name,
        productImage: product?.image,
        brand: product?.brand,
        price: product?.price,
        qty: product?.qty,
      };

      dispatch(addToCart({ token: user.token, product: cartItem }));
    } else {
      navigate("/login");
    }
  }
  
console.log(product?.rating)
 
  return (
    <Wrapper>
    <Grid container component={Paper} elevation={2} minHeight={"400px"}>
      <Grid item xs={12} lg={6} p={2}>
        <img
          src={product?.image}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} lg={6} p={2}>
        <Typography
          variant="h1"
          sx={{ fontSize: "3.2rem", fontWeight: "600" }}
        >
          {(product?.name.charAt(0).toUpperCase() + product?.name.slice(1)) || ""}
        </Typography>
        <Rating value={product?.rating || 0} readOnly />
        <Typography
          variant="h3"
          sx={{ fontSize: "1.6rem", fontWeight: "800", my: "16px" }}
        >
          Price : ${product?.price}
        </Typography>
        <Box>
          <Typography variant="body1" fontWeight={700} mb={4}>
            Brand : {product?.brand.charAt(0).toUpperCase() + product?.brand.slice(1)}
          </Typography>
          
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={700} mb={1}>
            Description :
          </Typography>
          <Typography>{product?.description}</Typography>
        </Box>
        <Box>
          {product?.countInStock > 0 ? (
            <Button variant="contained" sx={{mt : '50px'}} onClick={handleCart}>Add To Cart</Button>
          ) : (
            <Typography>Out of Stock</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  </Wrapper>
  )
}
const Wrapper=styled.section`
  padding: 9rem 0;
  background-color:#F4EDF2;

  `;
export default SingleProduct
