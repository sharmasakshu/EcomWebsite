import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart : null,
    loading : false,
    error : false,
}

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (token) => {
    try {
        let res = await axios.get(
            "http://localhost:8080/api/v1/cart",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          return res.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({token, product}) => {
    try {
        console.log(product)
        let res = await axios.post("http://localhost:8080/api/v1/cart/addToCart",product ,{
            headers : {
                authorization : `Bearer ${token}`,
            }
        })
      console.log(res)
      return res.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
  }
);

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
           
    },
    extraReducers: {
        [addToCart.pending] : (state) => {
            state.loading = true;
            state.error = false;
        },
        [addToCart.fulfilled] : (state, action) => {
            state.loading = false;
            state.error = false;
            state.cart = action.payload
        },
        [addToCart.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.error;
            state.cart = null
        },
        [fetchCartItems.pending] : (state) => {
            state.loading = true;
            state.error = false;
        },
        [fetchCartItems.fulfilled] : (state, action) => {
            state.loading = false;
            state.error = false;
            state.cart = action.payload
        },
        [fetchCartItems.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.error;
            state.cart = null
        },
      },
    });

    export default cartSlice.reducer