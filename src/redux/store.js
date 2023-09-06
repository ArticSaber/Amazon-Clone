import { configureStore } from "@reduxjs/toolkit";
import dataSlice, { fetchProductItems } from "./dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

store.dispatch(fetchProductItems());

export default store;
