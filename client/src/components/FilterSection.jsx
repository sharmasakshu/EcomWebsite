import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '../styles/Button';
import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const OrderSummary = () => {

  return (
   <>
     <Box sx={{ minWidth: 275, maxWidth:400 ,margin:'0 150px'}}>
      <Card variant="outlined" sx={{backgroundColor:'whitesmoke'}}>
      <CardContent  sx={{color: 'rgb(75, 48, 73)'}}>
      <Typography sx={{ fontSize: 14, borderBottom: '1px solid rgba(224, 224, 224, 1)' , color: 'rgb(75, 48, 73)', padding:'16px 0'}} >
        Subtotal:
      </Typography>
      <Typography sx={{ fontSize: 14 ,  borderBottom: '1px solid rgba(224, 224, 224, 1)' , padding:'16px 0'}} component="div">
      Shipping
      </Typography>
      <Typography sx={{ mb: 1.5 ,fontSize: 14, borderBottom: '1px solid rgba(224, 224, 224, 1)' ,padding:'16px 0' }} >
        GST 18%:
        <br/>
        Total Items:
      </Typography>
      <Typography variant="body2">
       
        Total:
      </Typography>   
    </CardContent>   
    </Card>
    <Link to ="/checkout">
    <CardActions sx={{alignItems:'end', alignContent:'end'}}>
    <Button>CHECKOUT</Button> 
    </CardActions>
    </Link>
    </Box>
    </>
  )
}

export default OrderSummary
