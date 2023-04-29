import React from 'react'
import BreadcrumbPart from '../components/BreadcrumbPart'
import ShoppingCart from '../components/ShoppingCart'

const Cart = () => {
 const title="Cart List";
  return (
    <div>
     <BreadcrumbPart title={title}/> 
        <ShoppingCart/>
    </div>
  )
}

export default Cart
