import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: {
    openedComponent: "Dashboard",
    isNavbarOpened: false,
    isViewProductModalOpened: false,
    isCreateProductModalOpened: false,
    isUpdateProductModalOpened: false,
  },
  reducers: {
    toggleComponent: (state, action) => {
      state.openedComponent = action.payload;
    },
    toggleNavbar: (state) => {
      state.isNavbarOpened = !state.isNavbarOpened;
    },
    toggleCreateProductModal: (state) => {
      state.isCreateProductModalOpened = !state.isCreateProductModalOpened;
    },
    toggleViewProductModal: (state) => {
      state.isViewProductModalOpened = !state.isViewProductModalOpened;
    },
<<<<<<< HEAD
    toggleUpdateProductModal: (state) => {
      state.isUpdateProductModalOpened = !state.isUpdateProductModalOpened;
    },
  },
});

export const {toggleComponent, toggleNavbar, toggleCreateProductModal, toggleViewProductModal, toggleUpdateProductModal} = extraSlice.actions;
=======
    toggleUpdateProductModal: (state, action) => {
      state.isUpdateProductModalOpened = !state.isUpdateProductModalOpened;
    },
    
  },
});

export const {
  toggleComponent,
  toggleCreateProductModal,
  toggleNavbar,
  toggleUpdateProductModal,
  toggleViewProductModal,
} = extraSlice.actions;
>>>>>>> 810d088b0b247c480c10d470d79b5c05060d2410

export default extraSlice.reducer;
