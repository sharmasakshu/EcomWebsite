import React from 'react'
import BreadcrumbPart from '../components/BreadcrumbPart'
import styled from 'styled-components'
import FilterSection from '../components/FilterSection'
import Sort from '../components/Sort'
import ProductList from '../components/ProductList'
import { useState } from 'react'

const Products = () => {
  const title="Products";

  const [selectedOption, setSelectedOption] = useState(''); 
  
  const handleOptionChange = (event) => {
    console.log(event.target.value);
       setSelectedOption(event.target.value);
  };
 
  return (
    <Wrapper>
      <BreadcrumbPart title={title}/>
    <div className='container'>
    
    <div className='grid grid-filter-column'>
    <div>
          <FilterSection />
   </div>
   <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>

    </div>
    </div>
    </Wrapper>
  )
}
const Wrapper=styled.section`
.grid-filter-column {
  grid-template-columns: 0.2fr 1fr;
}

@media (max-width: 600px}) {
  .grid-filter-column {
    grid-template-columns: 1fr;
  }
}
`;
export default Products


