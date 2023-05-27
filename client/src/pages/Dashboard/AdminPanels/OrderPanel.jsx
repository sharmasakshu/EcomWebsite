import React from 'react'
import { Box, Typography } from "@mui/material";
import Title from './Title';

const OrderPanel = () => {
  return (
    <Box
    sx={{
      padding: "30px 60px",
    }}
  >

    <Title heading={"Orders"}/>
  </Box>
  )
}

export default OrderPanel