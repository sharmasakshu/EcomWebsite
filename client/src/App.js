
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchCartItems } from './slices/cartSlice';
import { fetchProducts } from './slices/ProductSlice';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductPanel from './pages/Dashboard/AdminPanels/ProductPanel';
import OrderPanel from './pages/Dashboard/AdminPanels/OrderPanel';
import UserPanel from './pages/Dashboard/AdminPanels/UserPanel';
import Checkout from './pages/Checkout';
import About from './pages/About';

function App() {
  const {user} =useSelector((state)=> state.userstate);
  const {totalQty} =useSelector((state)=> state.cart);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  useEffect(() => {
    user && dispatch(fetchCartItems(user.token))
 }, [totalQty])
  
  return (
    <BrowserRouter>        	
    <ToastContainer
    autoClose={3000}
    />
    <GlobalStyle/> 
    <Navbar/>   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/singleproduct/:_id' element={<SingleProduct/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
      <Route index element={<ProductPanel/>}/>
      <Route path='products' element={<ProductPanel/>}/>
      <Route path='orders' element={<OrderPanel/>}/>
      <Route path='users' element={<UserPanel/>}/>
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
 
  );
}

export default App;
