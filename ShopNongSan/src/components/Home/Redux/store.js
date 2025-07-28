import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../Shop/Cart/shop.CartSlice.jsx";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
