
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product : null,
    loading : false,
    error : false,
    count:1,
}

export const fetchSingleProduct = createAsyncThunk("product/fetchSingleProduct", async (_id) => {
    try {
        let {data} = await axios(`http://localhost:8080/api/v1/products/${_id}`);
        return data;
    } catch (error) {
        // console.log(error)
        throw new Error(error.response.data.message)
    }
})

export const createReview = createAsyncThunk("product/createReview", async ({productId, message,rating,token}) => {
    try {
        let {data} = await axios.put(`http://localhost:8080/api/v1/products/addReview/${productId}`,{message,rating},
        {
            headers : {
                authorization : `Bearer ${token}`
            }
        }
        );
        return data;
    } catch (error) {
        // console.log(error)
        throw new Error(error.response.data.message)
    }
})


const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        increment: state => {
            state.count += 1;
          },
        decrement: state => {
            state.count -= 1;
          },         
    },
    extraReducers : {
        [fetchSingleProduct.pending] : (state) => {
            state.loading = true;
        },
        [fetchSingleProduct.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false
        },
        [fetchSingleProduct.rejected] : (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message;
        },
        [createReview.pending] : (state) => {
            state.loading = true;
        },
        [createReview.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false
        },
        [createReview.rejected] : (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message;
        },
    }
})
export const { increment, decrement } = productSlice.actions;
export default productSlice.reducer;

// https://nekobin.com/yalekuzadi