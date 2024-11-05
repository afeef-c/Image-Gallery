import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import imageSlice from './imageSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        images:imageSlice,
    }
})

export default store;