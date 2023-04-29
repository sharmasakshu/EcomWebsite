import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import userReducer from './slices/userSlice';
import SingleProductReducer from "./slices/singleProductSlice";
import cartReducer from "./slices/cartSlice"

const store = configureStore({
    reducer : {
        productstate : productReducer,
        userstate : userReducer,
        singleProduct : SingleProductReducer,
        cart:cartReducer,

    }
})

export default store
