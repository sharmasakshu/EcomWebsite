import React, { useEffect ,useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate } from "react-router-dom"
import { logout } from '../slices/userSlice';
import { fetchCartItems } from '../slices/cartSlice';
import { Badge } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

function ScrollTop(props) {

    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}
ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function Navbar(props) {
    const {cart,totalQty,totalAmount} =useSelector((state)=> state.cart);
    const {user} =useSelector((state)=> state.userstate);
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       user && dispatch(fetchCartItems(user.token))
    }, [totalQty])
   
    const pages = [
        user?.isAdmin ?
        <Link to="/dashboard" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400" }}>Dashboard</Link>:null,
        <Link to="/about" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400" }}>About</Link>,
        <Link to="/products" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400" }}>Products</Link>,
    ];
    
    const settings = [

        user?<Link to="/account" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400" }}>My Account</Link>:null,
        user?<Link style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400" }}>Logout</Link>:null
        // :<Link to="/login" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400",fontSize:'1.6rem' }}>Login</Link>    
    ];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSession=(event)=>{
        const session=event.target.innerHTML;
        // console.log(session);
        if(session==="Logout")
        {
            dispatch(logout()); 
            navigate('/');         
        }     
    }

    return (
        <>
            <AppBar position="fixed" sx={{ boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.05)", backgroundColor: "white", paddingLeft: "20px", paddingRight: "20px"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{height:"80px"}}>
                        {/* <Link to="/"
                            style={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#4B3049',
                                textDecoration: 'none',
                            }}
                        > */}
                         <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                         <Link to="/">
                            <Typography
                                variant="h4"
                                noWrap
                                // component="a"
                                // href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                   
                                    fontWeight: 800,
                                    letterSpacing: '.3rem',
                                    color: '#4B3049',
                                    fontFamily: 'rubik',
                                    textDecoration: 'none',
                                }}
                            >
                                Shopzilla

                            </Typography>
                            </Link>
                        {/* </Link> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="#4B3049"
                            >
                                <MenuIcon sx={{color:"#4B3049" }} />
                            </IconButton>
                          
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page,index) => (   
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>        
                                ))}
                            </Menu>
                        </Box>
                        {/* <Link to="/"
                            style={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 0.93,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                letterSpacing: '.3rem',
                                color: '#4B3049',
                                textDecoration: 'none',
                            }}
                        > */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 0.93,
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#4B3049',
                                }}
                            >
                               Shopzilla
                            </Typography>
                        {/* </Link> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } ,justifyContent:'center'}}>
                            {pages.map((page,index) => (
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0}}>
                            <Link to="/cart">
                            <IconButton sx={{ p: 0, marginRight:"10px", color:"#4B3049" }} color='#4B3049 ' size='large'>
                                <Badge badgeContent={cart && totalQty} color='secondary'>
                                <ShoppingCartIcon sx={{fontSize:'1.8rem'}}/>
                                </Badge>
                            </IconButton>
                            </Link>
                            <Tooltip>
                               { user?
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color:"#4B3049" }} color='#4B3049 ' size='large'>
                                    <AccountCircle sx={{fontSize:'1.8rem'}} />
                                </IconButton>
                                :<Link to="/login"><IconButton sx={{ p: 0, color:"#4B3049" }} color='#4B3049' size='large'>
                                    <AccountCircle sx={{fontSize:'1.8rem'}} />
                                </IconButton>
                                </Link>
                                 }
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting,index) => (
                                    <MenuItem key={index}  onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={handleSession}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>   
               <Toolbar id="back-to-top-anchor" />
               <ScrollTop {...props}>
                   <Fab size="small" aria-label="scroll back to top">
                       <KeyboardArrowUpIcon />
                   </Fab>
               </ScrollTop>
               </>       
    );
}
export default Navbar;


