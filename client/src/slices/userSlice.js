import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
    user : localUser,
    loading : false,
    error : false,
}

export const createUser = createAsyncThunk("user/createUser", async (user) => {
   try {
    let res = await axios.post("http://localhost:8080/api/v1/user/register", user)
    if(res.status===201)
    {
        let response = await axios.post("http://localhost:8080/api/v1/user/register", {},
        {
            headers:{
                authorization: `Bearer ${res.data.token}`
            }
        })
        if(response.status===201) 
        {
            console.log("Cart Successfully created")
        }  
        else{
              alert("Error ocurred");
        } 
    }
    return res.data;
   } catch (error) {
    throw new Error(error.response.data.message);
   }
})

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    try {
     let res = await axios.post("http://localhost:8080/api/v1/user/login", user)
     return res.data;
    } catch (error) {
        // console.log(error.response.data.message);
     throw new Error(error.response.data.message);
    }
 })

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        logout : (state, action) =>{
            localStorage.removeItem("user")
            state.user = null;
            state.loading = false;
            state.error = false;
        }
    },
    extraReducers : {
        [createUser.pending] : (state) => {
            state.loading = true;
            state.error = false;
            state.user = null;
        },
        [createUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        [createUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.user = null;
        },
        [loginUser.pending] : (state) => {
            state.loading = true;
            state.error = false;
            state.user = null;
        },
        [loginUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        [loginUser.rejected] : (state, action) => {
           
            console.log(action.error.message);
            state.error = action.error.message;
            state.loading = false;
            state.user = null;
        },
    }
})

export const {logout } = userSlice.actions;
export default userSlice.reducer;
