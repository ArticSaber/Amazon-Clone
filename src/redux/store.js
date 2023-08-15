import { configureStore } from "@reduxjs/toolkit";
import dataSlice, { fetchProducts } from "./dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

store.dispatch(fetchProducts());

export default store;
