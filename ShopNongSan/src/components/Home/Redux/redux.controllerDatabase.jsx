import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_DATABASE_URL}/api/client/cart/${userId}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/cart/${userId}/${productId}`,
      { quantity },
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ cartId }) => {
//     const res = await axios.post(
//       `${import.meta.env.VITE_DATABASE_URL}/api/client/cart/${cartId}`,
//       {
//         withCredentials: true,
//       }
//     );
//     return res.data;
//   }
// );
//

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/cart/${userId}/${productId}`,
      {
        quantity,
      },
      {
        withCredentials: true,
      }
    );
    return { id: productId, quantity: res.data.quantity };
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }) => {
    await axios.delete(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/cart/${userId}/${productId}`,
      {
        withCredentials: true,
      }
    );
    return productId;
  }
);
