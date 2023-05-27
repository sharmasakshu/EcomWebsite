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
import {Bounce, toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState ,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux'
import { loginUser } from '../slices/userSlice';

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();

  const {user,loading,error} =useSelector((state)=> state.userstate);
  // console.log(user);

  const dispatch=useDispatch();

  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  useEffect(() => {
    user && navigate("/");
   },[])

  //  useEffect(()=>{
  //   console.log(loading);
  //  },[loading])

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validate = (data) => {
    const passRegex=/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    if (!data.password || !data.email) {
      toast.error("Please enter the details below", {
        transition: Bounce
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
    else if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
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
    if(result) {
      dispatch(loginUser({
        email:formData.email,
        password:formData.password,
      }))
      // console.log(error+ "  "+ loading);
      if(!error && !loading && user )
      {
        toast.success("Logged In",{
          transition: Bounce
         })      
        navigate('/');
        setFormData({
        email: "",
        password: ""
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
            marginTop: "52px",
            marginBottom: "53px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor:"#4B3049" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
           Welcome Back!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              // label={<Typography sx={{fontSize:'1.4rem'}}>Email Address *</Typography>}
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              autoComplete="email"
              autoFocus
            />         
            <FormControl sx={{ marginTop: "16px", marginBottom: "8px", width: '100%' }} variant="outlined" required>
              <InputLabel htmlFor="password" >Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                onChange={handleFormChange}
                value={formData.password}
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
             {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"  />}
              label={<Typography variant="body2" color="textSecondary" >Remember me</Typography>}        
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

