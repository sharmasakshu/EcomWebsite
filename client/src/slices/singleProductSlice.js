
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product : null,
    loading : false,
    error : false,
}

export const fetchSingleProduct = createAsyncThunk("person/fetchSingleProduct", async (_id) => {
    try {
        let {data} = await axios(`http://localhost:8080/api/v1/products/${_id}`);
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
    }
})

export default productSlice.reducer;