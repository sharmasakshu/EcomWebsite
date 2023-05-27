import React from 'react'
import BreadcrumbPart from '../components/BreadcrumbPart'
import ShoppingCart from '../components/ShoppingCart'
import FilterSection from '../components/FilterSection'

const Cart = () => {
 const title="Cart List";
  return (
    <div>
     <BreadcrumbPart title={title}/> 
        <ShoppingCart/>
        <FilterSection/>
    </div>
  )
}

export default Cart
