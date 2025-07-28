import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  fetchCart,
  updateCart,
} from "../../Home/Redux/redux.controllerDatabase";

// Take data from useContext CartContext
const initialState = {
  listCart: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.listCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        const cart = action.payload;
        if (cart && Array.isArray(cart[0].products)) {
          state.listCart = cart[0].products;
        } else {
          state.listCart = [];
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.listCart.find(
          (item) => item.productId === productId
        );
        if (item) item.quantity += quantity;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.listCart.find(
          (item) => item.productId === productId
        );
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        const id = action.payload;
        state.listCart = state.listCart.filter((item) => item._id !== id);
      });
  },
});

export default cartSlice.reducer;
