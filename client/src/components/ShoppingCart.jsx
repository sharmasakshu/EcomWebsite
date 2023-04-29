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
import { fetchCartItems } from '../slices/cartSlice';
import { useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { QuantityPicker } from 'react-qty-picker';
import {useNavigate } from 'react-router-dom';

// function createData(product, price, quantity, total, remove) {
//   return { product, price, quantity, total, remove };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
    const {cart} =useSelector((state)=> state.cart);
    const {user} =useSelector((state)=> state.userstate);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(cart?.items[0].price)
    const CartItems=cart?.items||[];

    useEffect(() => {
       user ? dispatch(fetchCartItems(user?.token)): navigate('/login')
    }, [])
    
  return (
    <TableContainer component={Paper} sx={{margin:"4rem auto", width:"80%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{fontWeight:600}}>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CartItems.map((row) => (
          //  sum={row?.qty} *{row?.price};
            <TableRow
              key={row?.productName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{display:'flex',alignItems:'center'}}>
                <img src={row?.productImage} alt="" style={{width:"20%",border:"1px solid #eeeeee"}}/>
                <Typography sx={{margin:'2rem'}}>{row?.productName}</Typography>

              </TableCell>
              <TableCell >{row?.price}</TableCell>
              <TableCell >{row?.price}</TableCell>

              <TableCell >
              <QuantityPicker value={row?.qty} width='3rem'/>
      
              </TableCell>
              <TableCell >
            
                </TableCell>
              <TableCell ><DeleteIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}