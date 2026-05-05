import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addtoCart(state, action) {
      const{ product, quantity} = action.payload;

      const existingItem = state.cart.find(
        item => item.product.id === product.id
      );

      if (existingItem){
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },
    removeFromCart(state, action){
      
      state.cart = state.cart.filter(
        item => item.product.id !== action.payload.id);
    },
    updateCartItem(state, action){
      const item = state.cart.find(
        item => item.product.id === action.payload.productId
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },

  },
});

export const {addtoCart, removeFromCart, updateCartItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
