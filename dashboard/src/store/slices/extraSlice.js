// dashboard/src/store/slices/extraSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openComponent: 'Dashboard',
    isNavbarOpen: false,
    isCreateProductModalOpen: false,
    isViewProductModalOpen: false,
    isUpdateProductModalOpen: false,
};

const extraSlice = createSlice({
    name: 'extra',
    initialState,
    reducers: {
        toggleComponent: (state, action) => {
            state.openComponent = action.payload;
        },
        toggleNavbar: (state) => {
            state.isNavbarOpen = !state.isNavbarOpen;
        },
        toggleCreateProductModal: (state) => {
            state.isCreateProductModalOpen = !state.isCreateProductModalOpen;
        },
        toggleViewProductModal: (state) => {
            state.isViewProductModalOpen = !state.isViewProductModalOpen;
        },
        toggleUpdateProductModal: (state) => {
            state.isUpdateProductModalOpen = !state.isUpdateProductModalOpen;
        }
    }
});

export const { 
    toggleComponent, 
    toggleNavbar, 
    toggleCreateProductModal, 
    toggleViewProductModal, 
    toggleUpdateProductModal 
} = extraSlice.actions;

export default extraSlice.reducer;