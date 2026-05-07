import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import extraReducer from './slices/extraSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        product: productReducer,
        order: orderReducer,
        extra: extraReducer
    }
});

export default store;