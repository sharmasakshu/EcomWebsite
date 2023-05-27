import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector,useDispatch } from 'react-redux';
import { deleteItem, fetchCartItems } from '../slices/cartSlice';
import { useEffect,useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicTable() {
    const {cart,totalQty,totalAmount} =useSelector((state)=> state.cart);
    const {user} =useSelector((state)=> state.userstate);
    const {product} =useSelector((state)=> state.singleProduct);
    console.log(product);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const Items=cart?.items||[];
    const {_id}= useParams();

    useEffect(() => {
       user ? dispatch(fetchCartItems(user?.token)): navigate('/login')
    }, [])

    const handleDelete=(id)=>{
      console.log(id);
      if(user)
      {
      cart && dispatch(deleteItem({ token: user.token,productId: id })); 
      }
      else{
        navigate('/login');
      }
  
  }

  console.log(cart?.items[0]?.productId)

  return (
    <Wrapper>
    {  Items.length> 0 ?
      (
    <TableContainer component={Paper} sx={{margin:"4rem auto", width:"80%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell  sx={{ fontSize: "1.2rem", fontWeight: "600" , color:'#795376'}}>Product</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "600" , color:'#795376'}} align="right">Price</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "600" , color:'#795376'}} align="right">Quantity</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "600" , color:'#795376'}} align="right">Total</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "600" , color:'#795376'}} align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Items.map((row) => (
          //  sum={row?.qty} *{row?.price};
            <TableRow
              key={row?.productName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{display:'flex',alignItems:'center'}}>
                <img src={row?.productImage} alt="" style={{width:"20%",border:"1px solid #eeeeee",margin:'0.75rem'}}/>
                <Typography sx={{margin:'2rem', color:'#795376', fontWeight:'400'}}>{row?.productName}</Typography>
              </TableCell>
              <TableCell sx={{color:'#2a2a2a',fontWeight:'600'}} >
              ${row?.price}
              </TableCell>
              <TableCell >
                <div className='input-group'>
                  <span className='input-group'>-</span>
                  <input min="1" type="text" value={row?.qty|| 1} max={row?.CountInStock}/>
                  <span className='input-group'>+</span>
                </div>        
              </TableCell>
              <TableCell sx={{color:'#2a2a2a',fontWeight:'600'}}>
              ${totalAmount}
              </TableCell>
              <TableCell ><DeleteIcon onClick={()=>handleDelete(row?.productId)} sx={{cursor:'pointer'}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> ) : 
    (
      <Stack sx={{ width: '50%' , margin:'4rem auto',}} >
      <Alert severity="info">Your Cart is empty!</Alert>
      </Stack>
  )
}
    </Wrapper>
  );
}
const Wrapper = styled.section`
input{
  width: 2.6rem;
  text-align:center;
  border:none;
  padding: 0.6rem;
}
span{
  // border:1px solid black;
}
div{
  border:2px solid rgb(238, 238, 238);
  text-align:center;
}
`;