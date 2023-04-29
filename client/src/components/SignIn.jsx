import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
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
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import '../../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';

const theme = createTheme();

export default function SignIn() {

  const [showPassword, setShowPassword] = React.useState(true);
  const { user, loading, error } = useSelector((state) => state.userstate);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    user && navigate("/")
  }, [])


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    if (!data.password || !data.email) {
      // alert("Please enter the details below")
      toast.error("Please enter the details below", {
        // autoClose: 3000,
        transition: Bounce,
      })
      return false;
    }
    else if (!passRegex.test(data.password)) {
      toast.error("Invalid Password", {
        transition: Bounce
      })
      return false;
    }
    else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
      toast.error("Invalid Email", {
        autoClose: 3000,
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
      dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }))
      if (!error && !loading) {
        navigate('/');
        toast.success("Logged in", {
          transition: Bounce,
        })
        setFormData({
          email: "",
          password: ""
        });
      }
      console.log(formData);
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
            marginBottom: "53px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, backgroundColor: "#4B3049" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome Back!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              autoComplete="email"
              autoFocus
            />

            <FormControl sx={{ marginTop: "16px", marginBottom: "8px", width: '100%' }} variant="outlined" required>
              <InputLabel htmlFor="password">Password</InputLabel>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              // bgcolor #1976d2
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#B08EAD", border: "2px solid #B08EAD" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/account/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}