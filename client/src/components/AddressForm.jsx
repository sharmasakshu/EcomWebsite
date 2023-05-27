import React from "react";
import { Typography,Grid ,TextField ,FormControlLabel,Checkbox} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {FormControl} from "@mui/material";
import { CountryStateDistrict } from "country_state_district";
import { useState } from "react";

const AddressForm = ({formData,handleFormChange}) => {
   
  let country_state_district = new CountryStateDistrict();
  let countries = country_state_district.getAllCountries();
  let states = country_state_district.getStatesByCountryId(1);
  let districts = country_state_district.getDistrictsByStateId(29);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3} component={"form"} onChange={handleFormChange}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formData.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formData.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={formData.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={formData.city}
          />
 {/* <FormControl required variant="standard" fullWidth>
        <InputLabel
         id="demo-simple-select-standard-label"
        >City</InputLabel> 
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="city"
          name="city"
          value={formData.city}
          onChange={handleFormChange}
          required
        >
          {
          districts.map((district, index) => (
            <MenuItem key={district.id} value={district.name} >{district.name}</MenuItem>
  ))
          }
        </Select>
      </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
          required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={formData.state}
          /> */}

<FormControl required variant="standard" fullWidth>
        <InputLabel
         id="demo-simple-select-standard-label"
        >State</InputLabel> 
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="State"
          name="state"
          value={formData.state}
          onChange={handleFormChange}
          required
        >
          {
          states.map((state, index) => (
            <MenuItem key={state.id} value={state.name}>{state.name}</MenuItem>
  ))
          }
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={formData.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={formData.country}
          /> */}
               <FormControl required variant="standard" fullWidth>
        <InputLabel
         id="demo-simple-select-standard-label"
        >Country</InputLabel> 
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleFormChange}
          required
        >
          {
          countries.map((country, index) => (
            <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>
  ))
          }
           {/* {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))} */}
{/*          
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
    
  );
}

export default AddressForm;
