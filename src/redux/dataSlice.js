import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserCart = createAsyncThunk(
  "data/fetchUserCart",
  async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "data/addProductToCart",
  async (product) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, product);
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
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const existingItem = state.cartItems.find(
          (item) => item.productID === action.payload.productID
        );
        if (existingItem) {
          existingItem.productSelectedQuantity += 1;
        } else {
          state.cartItems.push({
            ...action.payload,
            productSelectedQuantity: 1,
          });
        }
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addMatcher(
        (action) =>
          [addProductToCart.fulfilled, fetchUserCart.fulfilled].includes(
            action.type
          ),
        (state, action) => {
          if (action.type === addProductToCart.fulfilled.type) {
            const existingItem = state.cartItems.find(
              (item) => item.productID === action.payload.productID
            );
            if (existingItem) {
              existingItem.productSelectedQuantity += 1;
            } else {
              state.cartItems.push({
                ...action.payload,
                productSelectedQuantity: 1,
              });
            }
          } else if (action.type === fetchUserCart.fulfilled.type) {
            state.cartItems = action.payload;
          }
        }
      );
  },
});

export const { additems, removeitems, checkout, login, logout, signup } =
  dataSlice.actions;

export default dataSlice.reducer;
