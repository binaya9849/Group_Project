// dashboard/src/store/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';
import { toast } from 'react-toastify';
import { toggleCreateProductModal, toggleUpdateProductModal } from './extraSlice';

const initialState = {
    loading: false,
    fetchingProducts: false,
    products: [],
    totalProducts: 0
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProductRequest: (state) => { state.loading = true; },
        createProductSuccess: (state, action) => {
            state.loading = false;
            state.products = [action.payload, ...state.products];
        },
        createProductFailed: (state) => { state.loading = false; },

        getAllProductsRequest: (state) => { state.fetchingProducts = true; },
        getAllProductsSuccess: (state, action) => {
            state.fetchingProducts = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
        },
        getAllProductsFailed: (state) => { state.fetchingProducts = false; },

        updateProductRequest: (state) => { state.loading = true; },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            state.products = state.products.map(product => 
                product.id === action.payload.id ? action.payload : product
            );
        },
        updateProductFailed: (state) => { state.loading = false; },

        deleteProductRequest: (state) => { state.loading = true; },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.products = state.products.filter(product => product.id !== action.payload);
            state.totalProducts = Math.max(0, state.totalProducts - 1);
        },
        deleteProductFailed: (state) => { state.loading = false; },
    }
});

export const {
    createProductRequest, createProductSuccess, createProductFailed,
    getAllProductsRequest, getAllProductsSuccess, getAllProductsFailed,
    updateProductRequest, updateProductSuccess, updateProductFailed,
    deleteProductRequest, deleteProductSuccess, deleteProductFailed
} = productSlice.actions;

export default productSlice.reducer;

export const createNewProduct = (data) => async (dispatch) => {
    try {
        dispatch(createProductRequest());
        const response = await axiosInstance.post('/product/admin/create', data);
        dispatch(createProductSuccess(response.data.product));
        toast.success(response.data.message || "Product created successfully");
        dispatch(toggleCreateProductModal());
    } catch (error) {
        dispatch(createProductFailed());
        toast.error(error.response?.data?.message || "Failed to create product");
    }
};

export const fetchAllProducts = (page = 1) => async (dispatch) => {
    try {
        dispatch(getAllProductsRequest());
        const response = await axiosInstance.get(`/product?page=${page}`);
        dispatch(getAllProductsSuccess(response.data));
    } catch (error) {
        dispatch(getAllProductsFailed());
    }
};

export const updateProduct = (data, id) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());
        const response = await axiosInstance.put(`/product/admin/update/${id}`, data);
        dispatch(updateProductSuccess(response.data.updatedProduct));
        toast.success(response.data.message || "Product updated successfully");
        dispatch(toggleUpdateProductModal());
    } catch (error) {
        dispatch(updateProductFailed());
        toast.error(error.response?.data?.message || "Failed to update product");
    }
};

export const deleteProduct = (id, page) => async (dispatch, getState) => {
    try {
        dispatch(deleteProductRequest());
        const response = await axiosInstance.delete(`/product/admin/delete/${id}`);
        dispatch(deleteProductSuccess(id));
        toast.success(response.data.message || "Product deleted successfully");

        const state = getState();
        const updatedTotal = state.product.totalProducts;
        const updatedMaxPage = Math.ceil(updatedTotal / 10) || 1;
        const validPage = Math.min(page, updatedMaxPage);
        dispatch(fetchAllProducts(validPage));
    } catch (error) {
        dispatch(deleteProductFailed());
        toast.error(error.response?.data?.message || "Failed to delete product");
    }
};