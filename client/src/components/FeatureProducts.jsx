import React from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../slices/ProductSlice';
import { useEffect } from 'react';
import Item from './Item';

const FeatureProducts = () => {
  const {products,loading,error} =useSelector((state)=> state.productstate);
  console.log(products);

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  return (
    <Wrapper>
    <div className='container'>
    {/* <div className="intro-data">Check Now!</div> */}
    <h2 className="common-heading">Trending Items</h2>
        {         
        loading?<h1>loading....</h1>:(
         <h3 className="grid grid-three-column">         
         { products?.map((product,index)=>(       
             <Item title={product.name} id={product._id} key={index} description={product.description} image={product.image} price={product.price}/>       
         ))
         }
         </h3>
        )        
        }
        </div>  
   </Wrapper>
  )
}

const Wrapper=styled.section`
  padding: 9rem 0;
  background-color:#F4EDF2;

  .container {
  max-width: 120rem;
  }
  .common-heading{
        text-align:center;
        font-weight: bold;
        color:#4B3049;
        margin-bottom:80px;
  }
  h3 { 
    text-transform: capitalize;
  }
  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  
`;

export default FeatureProducts
