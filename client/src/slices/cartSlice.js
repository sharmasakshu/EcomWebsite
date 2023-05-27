import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * The above code defines two functions to calculate the total quantity and amount of items in an array
 * of objects.
 * @param arr - The parameter "arr" in both functions represents an array of objects. Each object in
 * the array should have a "qty" property (representing quantity) and a "price" property (representing
 * price per unit). The functions use these properties to calculate the total quantity and total amount
 * of all items
 * @returns Two functions are being returned. The first function `calculateQty` takes an array as an
 * argument and returns the total quantity of items in the array. The second function `calculateAmount`
 * takes an array as an argument and returns the total amount of all items in the array by multiplying
 * the quantity of each item with its price and then adding up all the amounts.
 */
const calculateQty = (arr) => {
    return arr?.reduce((qty, item) => qty + item.qty, 0)
}
const calculateAmount = (arr) => {
    return arr?.reduce((amount, item) => (item.qty * item.price) + amount, 0)
}

const initialState = {
    cart : null,
    loading : false,
    error : false,
    totalQty : 0,
    totalAmount : 0
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
        let res = await axios.put("http://localhost:8080/api/v1/cart/addToCart",product ,{
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

export const deleteItem = createAsyncThunk(
    "cart/deleteItem",
    async ({token, productId}) => {
      try {
          console.log(productId)
          let res = await axios.put(`http://localhost:8080/api/v1/cart/delete/${productId}`,{} ,{
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
            state.totalQty = calculateQty(action.payload?.items)
            state.totalAmount = calculateAmount(action.payload?.items)
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
            state.totalQty = calculateQty(action.payload?.items)
            state.totalAmount = calculateAmount(action.payload?.items)
        },
        [fetchCartItems.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.error;
            state.cart = null
        },
        [deleteItem.pending] : (state) => {
            state.loading = true;
            state.error = false;
        },
        [deleteItem.fulfilled] : (state, action) => {
            state.loading = false;
            state.error = false;
            state.cart = action.payload
            const index = state.cart.items.findIndex(
                (item) => item.productId === action.payload
              );
              state.cart.items.splice(index, 1);
              state.totalQty = calculateQty(state.cart.items)
              state.totalAmount = calculateAmount(state.cart.items)
        },
        [deleteItem.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.error;
            state.cart = null
        },
      },
    });

    export default cartSlice.reducer