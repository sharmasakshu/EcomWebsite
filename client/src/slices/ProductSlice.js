import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products : [],
    loading : false,
    error : false,
}

export const fetchProducts = createAsyncThunk("person/fetchProducts", async () => {
    try {
        // https://api.pujakaitem.com/api/products
        let {data} = await axios("http://localhost:8080/api/v1/products");
        return data;
    } catch (error) {
        // console.log(error)
        throw new Error(error.response.data)
    }
})

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
           
    },
    extraReducers : {
        [fetchProducts.pending] : (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled] : (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [fetchProducts.rejected] : (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message;
        },
    }
})

export default productSlice.reducer;