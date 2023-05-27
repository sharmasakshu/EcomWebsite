import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link} from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux'
import { createUser } from '../slices/userSlice';
import {useNavigate} from "react-router-dom"
import styled from 'styled-components';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const {user,loading,error} =useSelector((state)=> state.userstate);
  // console.log(error);

  const dispatch=useDispatch();

  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    user && navigate("/");
   }, [])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    terms:false
  });

  const handleFormChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      terms: e.target.checked
      });
      // console.log(formData)
  };
  const validate = (data) => {
    const passRegex=/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    if (!data.password || !data.email || !data.firstName || !data.lastName || !data.terms) {
      toast.error("Please enter the details below", {
        transition: Bounce,
      })
      return false;
    }
    else if(!passRegex.test(data.password))
    {
         toast.error("Invalid Password",{
          transition: Bounce
         })
         return false;
    }
    else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
      toast.error("Invalid Email", {
        transition: Bounce,
      })
      return false;
    }
    return true;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
 
    let result = validate(formData);
   
    if (result) {

    dispatch(createUser({
      username: formData.firstName+" "+formData.lastName,
      email:formData.email,
      password:formData.password,
    }))   
      if(!error && !loading && user)
      {
        navigate('/');
        toast.success("Account Created Successfully", {   
          transition: Bounce
        })
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          terms: false
        }); 
      }
      else{
        toast.error(error,{
          transition: Bounce
         })
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            marginTop: "52px",
            marginBottom: "52px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Avatar sx={{ m: 1, backgroundColor:"#4B3049" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }} variant="outlined" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    name="password"
                    type={showPassword ? 'password' : 'text'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"/>}
                  // label="I have read and agree to the Terms of Use and Privacy Policy."
                  label={<Typography >I have read and agree to the Terms of Use and Privacy Policy.</Typography>}     
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{':hover': {
                bgcolor: '#B08EAD', // theme.palette.primary.main
                color: 'white',
                // boxShadow:'0px 10px 15px rgba(0, 0, 0, 0.05)'
              },mt: 3, mb: 2 ,boxShadow:'none', backgroundColor:"#B08EAD", border:"1px solid #B08EAD"}}
            >
               Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
