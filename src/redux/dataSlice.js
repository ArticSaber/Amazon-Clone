import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/shoppingcart`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const dataSlice = createSlice({
  name: "data",
  initialState: {
    cartItems: [],
    productItems: [],
    userId: null,
    userName: null,
  },
  reducers: {
    additems: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productID === action.payload.productID
      );
      if (existingItem) {
        existingItem.productSelectedQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, productSelectedQuantity: 1 });
      }
    },
    removeitems: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productID === action.payload.productID
      );
      if (existingItem && existingItem.productSelectedQuantity > 1) {
        existingItem.productSelectedQuantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.productID !== action.payload.productID
        );
      }
    },
    checkout: (state, action) => {
      state.cartItems = [];
    },
    signup: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    logout: (state, action) => {
      state.cartItems = [];
      state.userId = null;
      state.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productItems = action.payload;
      })
  },
});

export const { additems, removeitems, checkout, login, logout, signup } =
  dataSlice.actions;

export default dataSlice.reducer;
