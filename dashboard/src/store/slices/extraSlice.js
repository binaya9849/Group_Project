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
<<<<<<< HEAD

    toggleCreateProductModal: (state) => {
      state.isCreateProductModalOpened =
        !state.isCreateProductModalOpened;
    },

    toggleViewProductModal: (state) => {
      state.isViewProductModalOpened =
        !state.isViewProductModalOpened;
    },

    toggleUpdateProductModal: (state) => {
      state.isUpdateProductModalOpened =
        !state.isUpdateProductModalOpened;
    },
  },
});

=======
    toggleCreateProductModal: (state) => {
      state.isCreateProductModalOpened = !state.isCreateProductModalOpened;
    },
    toggleViewProductModal: (state) => {
      state.isViewProductModalOpened = !state.isViewProductModalOpened;
    },
    toggleUpdateProductModal: (state) => {
      state.isUpdateProductModalOpened =
        !state.isUpdateProductModalOpened;
    },
  },
});

>>>>>>> 072a69ebe75979ab4f7d1cacf3b80406473f30de
export const {
  toggleComponent,
  toggleNavbar,
  toggleCreateProductModal,
  toggleViewProductModal,
  toggleUpdateProductModal,
} = extraSlice.actions;

export default extraSlice.reducer;