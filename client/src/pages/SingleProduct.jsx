import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { createReview, fetchSingleProduct } from '../slices/singleProductSlice';
import { useDispatch} from 'react-redux';
import { useEffect ,useState} from 'react';
import { Grid, Paper, Box, Typography, Rating, TextField, Avatar } from "@mui/material";
import { addToCart } from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { increment,decrement } from '../slices/singleProductSlice';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Button } from '../styles/Button';

const SingleProduct = () => {

  const {product,count} =useSelector((state)=> state.singleProduct);
  const {user}=useSelector((state)=> state.userstate);
  const {cart} = useSelector((state)=> state.cart);
  const [quantity, setQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const totalStocks=product?.countInStock;
  const [customerRating, setCustomerRating] = useState(0);
  const [customerReview, setCustomerReview] = useState("");
  const {_id}= useParams();

  const handleReview = () => {
    if(customerReview && customerRating){
      dispatch(createReview({
        productId : product?._id,
        message : customerReview,
        rating : customerRating,
        token : user?.token
      }))
      setCustomerReview("")
      setCustomerRating(0)
    }
  };

  useEffect(() => {
     _id && dispatch(fetchSingleProduct(_id));
  }, [])

  const handleAddToCart =()=>{
    if (user) {
      let cartItem = {
        productId: product?._id,
        productName: product?.name,
        productImage: product?.image,
        countInStock: product?.countInStock,
        price: product?.price,
        qty: count,
      };   
      dispatch(addToCart({ token: user.token, product: cartItem }));
    } else {
      navigate("/login");
    }
  }
  console.log(product?._id)
  // const handleChange = (event) => {
  //   setCount(event.target.value);
  // };

  const handleInc =(e)=>{
    if(count<product?.countInStock)
    {
      dispatch(increment())
    }
  }
  const handleDec =(e)=>{
       if(count>1)
       {
        dispatch(decrement())
       }
}

const CartButton = () => {
  return (
    <Button
      style={{
        // backgroundColor: "#4B3049",
        fontSize: "16px",
        textTransform: "capitalize",
        fontWeight: "500",
        fontFamily: "'Jost', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "13px",
      }}
      onClick={handleAddToCart}
    >
      Add To Cart <ShoppingBagOutlinedIcon style={{ marginBottom: "5px" }} />
    </Button>
  );
};
 
  return (
    <Wrapper>
    {/* <Grid container component={Paper} elevation={2} minHeight={"400px"}>
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
        <Box sx={{ display: 'flex', gap:'2rem',alignItems:'end',justifyContent:'start' }}>
        <Box sx={{}}>
          {product?.countInStock > 0 ? (
            <Button variant="contained" sx={{mt : '50px'}} onClick={handleCart}>Add To Cart</Button>
          ) : (
            <Typography>Out of Stock</Typography>
          )}

        </Box>
                  <div className='input-group'>
                  <span className='Counter' 
                  onClick={handleDec} 
                  >-</span>
                  <input type="submit" value={count}/>
                  <span className='Counter' 
                  onClick={handleInc} 
                  >+</span>
                </div>
   </Box>
      </Grid>
    </Grid> */}


    <Grid container component={Paper} elevation={2} minHeight={"400px"}>
        <Grid item xs={12} lg={6} p={2}>
          <img
            src={product?.image}
            alt={product?.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} lg={6} p={2}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "16px",
                lineHeight: "1.5",
                wordWrap: "break-word",
                color: "#767676",
                letterSpacing: "0.5px",
                mb: "5px",
              }}
            >
              {product?.category.charAt(0).toUpperCase() +
                product?.category?.slice(1) || ""}
            </Typography>
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "28px",
              fontWeight: "500",
              lineHeight: "1.33",
              color: "#4B3049",
              fontFamily: "'Jost', sans-serif",
              mb: "6px",
            }}
          >
            {product?.name.charAt(0).toUpperCase() + product?.name?.slice(1) ||
              ""}
          </Typography>
          <Box display={"flex"} alignItems={"center"} mb={2}>
            <Rating value={product?.rating || 0} readOnly size="small" />
            <span style={{ color: "#4B3049", marginLeft: "10px" }}>
              ({product?.numOfReviews})
            </span>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ mb: "20px", mt: "4px" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontWeight: "500",
                mr: "16px",
                color: "#4B3049",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {`$${product?.price.toLocaleString()}` || ""}
            </Typography>
            <span style={{ color: "#4B3049" }}>(In Stock)</span>
          </Box>

          <Box>
            <Typography
              variant="body1"
              fontWeight={600}
              mb={"3px"}
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Description :
            </Typography>
            <Typography
              sx={{
                color: "#525252",
                fontSize: "16px",
                lineHeight: "1.5",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {product?.description}
            </Typography>
          </Box>
          <Box>
            {product?.countInStock > 0 ? (
              <Box display={"flex"} alignItems={"center"} mt={"30px"} gap={2}>
                <CartButton />
                {/* <Counter
                  qty={qty}
                  setQty={setQty}
                  countInStock={product?.countInStock}
                /> */}
                 <div className='input-group'>
                  <span className='Counter' 
                  onClick={handleDec} 
                  >-</span>
                  <input type="submit" value={count}/>
                  <span className='Counter' 
                  onClick={handleInc} 
                  >+</span>
                </div>

              </Box>
            ) : (
              <Typography>Out of Stock</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    <Box
        sx={{
          marginTop: {
            xs: "15px",
            md: "20px",
          },
          // paddingInline: {
          //   xs: "30px",
          //   lg: "50px",
          // },
          paddingBlock: {
            xs: "10px",
            lg: "20px",
          },
        }}
      >
        <Grid container component={Paper} elevation={4}>
          <Grid item xs={12} sm={5} md={6}>
            <Box sx={{ padding: "20px" }}>
              <Typography
                variant="h5"
                fontFamily={"'Jost', sans-serif"}
                letterSpacing={1}
                fontWeight={700}
              >
                Post a Review :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <Rating
                  precision={0.5}
                  value={customerRating}
                  onChange={(event, newValue) => {
                    setCustomerRating(newValue);
                  }}
                  sx={{ width: "fit-content" }}
                />
                <TextField
                  label="Message"
                  placeholder="Type your review"
                  size="small"
                  multiline
                  maxRows={4}
                  value={customerReview}
                  onChange={(e) => {
                    setCustomerReview(e.target.value);
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      sm: "90%",
                      md: "50%",
                    },
                  }}
                />
                {/* <Button
                  onClick={handleReview}
                  style={{
                    width: "fit-content",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                  variant="contained"
                >
                  Post Review
                </Button> */}
                <Button
                  onClick={handleReview}
                  style={{
                    width: "fit-content",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  Post Review
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Box sx={{ padding: "20px" }}>
              {product?.reviews?.length > 0 && (
                <Typography
                  variant="h5"
                  fontFamily={"Poppins"}
                  letterSpacing={1}
                  fontWeight={900}
                >
                  Customer Reviews :
                </Typography>
              )}
              {product?.reviews?.length > 0 &&
                product?.reviews.map((review) => (
                  <Box key={review._id} sx={{ marginBottom: "20px" }}>
                    <Box
                      display={"flex"}
                      gap={2}
                      alignItems={"flex-start"}
                      mt={2}
                    >
                      <Avatar>
                        {review?.username?.slice(0, 1).toUpperCase()}
                      </Avatar>
                      <Typography
                        variant="subtitle1"
                        fontFamily={"Poppins"}
                        fontWeight={"700"}
                      >
                        {review?.username
                          ?.slice(0, 1)
                          .toUpperCase()
                          .concat(review?.username?.slice(1))}
                      </Typography>
                    </Box>
                    <Rating
                      readOnly
                      precision={0.5}
                      value={review?.rating}
                      sx={{ marginTop: "10px" }}
                    />
                    <Typography
                      variant="subtitle2"
                      fontFamily={"Poppins"}
                      fontWeight={"500"}
                      sx={{ marginTop: "5px", paddingRight: "70px" }}
                    >
                      {review.message}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

  </Wrapper>
  )
}
const Wrapper=styled.section`
  padding: 9rem 0;
  background-color:#F4EDF2;
  input{
    width: 2.6rem;
    text-align:center;
    border:none;
    padding: 0.6rem;
  }
  .Counter{
    padding:0.6rem
  }
  .input-group{
    border:2px solid rgb(238, 238, 238);
    text-align:center;
  }
  `;
export default SingleProduct
