import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    productItems: [],
    userId: null,
    userName: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    empty: () => {
      return initialState;
    },
    change: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { empty, change } = formSlice.actions;

export default formSlice.reducer;
