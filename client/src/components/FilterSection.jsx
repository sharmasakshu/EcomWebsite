// import { Update } from '@material-ui/icons'
import React from 'react'
import { useState,useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../slices/ProductSlice';
import styled from 'styled-components';
import { Button } from "../styles/Button";
import { Slider } from '@mui/material';

const FilterSection = () => {

  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const {products} =useSelector((state)=> state.productstate);
  // console.log(products);

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [category])

  const UpdateFilterValue=(event)=>{
         console.log(event.target.value)
         setText(event.target.value);
  }
  const handleChange=(event)=>{
    console.log(event.target.value)
    setCategory(event.target.value);
  }
  const UpdateBrandValue=(event)=>{
    console.log(event.target.value)
    setBrand(event.target.value);
  }
  const clearFilters=()=>{

  }

  return (
    <Wrapper>
    <div className='filter-search'>
     <form onSubmit={(e)=>e.preventDefault()}>
     <input type="text" name="text" value={text} placeholder="SEARCH" onChange={UpdateFilterValue}/>
     </form>
     </div>

     <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          // labelId="demo-multiple-name-label"
          id="category"
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
        >
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="laptop">Laptop</MenuItem>
            <MenuItem value="computer">Computer</MenuItem>
            <MenuItem value="watch">Watch</MenuItem>
            <MenuItem value="camera">Camera</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="c">Brand</InputLabel>
        <Select
          id="Brand"
          value={brand}
          onChange={UpdateBrandValue}
          input={<OutlinedInput label="Brand" />}
        >
            <MenuItem value="apple">Apple</MenuItem>
            <MenuItem value="dell">Dell</MenuItem>
            <MenuItem value="asus">Asus</MenuItem>
            <MenuItem value="canon">Canon</MenuItem>
            <MenuItem value="rolex">Rolex</MenuItem>
        </Select>
        
      </FormControl>
       {/* <div className="filter_price">
        <h3>Price</h3>
      <Slider aria-label="Volume" 
      // value={value}
       onChange={handleChange} />
       </div> */}

       <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
      margin-left: 1rem;
     
    }
  }
  `;

export default FilterSection
