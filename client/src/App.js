
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
import Footer from './components/Footer';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
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
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
 
  );
}

export default App;
