// dashboard/src/store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    orders: [],
    error: null
};

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/order/admin/get-all');
            return response.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ orderId, status }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/order/admin/update/${orderId}`, { status });
            toast.success(response.data.message || "Order status updated successfully");
            return response.data.updatedOrder;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update order");
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update order status");
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'orders/delete',
    async (orderId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/order/admin/delete/${orderId}`);
            toast.success(response.data.message || "Order deleted successfully");
            return orderId;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete order");
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete order");
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(order => order.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = { ...state.orders[index], ...action.payload };
                }
            })
            .addCase(updateOrderStatus.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default orderSlice.reducer;