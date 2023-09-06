import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";
import produce from "immer";

const productsAdapter = createEntityAdapter();

export const fetchProductItems = createAsyncThunk(
  "data/fetchProductItems",
  async (_, { getState }) => {
    const { productItems } = getState().data;
    if (productItems.length === 0) {
      try {
        const response = await axios.get(`${BASE_URL}/shoppingcart`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

export const additems = (product) => async (dispatch, getState) => {
  const { data } = getState();
  const existingItem = data.cartItems.find(
    (item) => item.productID === product.productID
  );
  if (existingItem) {
    dispatch(
      dataSlice.actions.additems(
        produce(existingItem, (draftItem) => {
          draftItem.productSelectedQuantity += 1;
        })
      )
    );
  } else {
    dispatch(
      dataSlice.actions.additems({
        ...product,
        productSelectedQuantity: 1,
      })
    );
  }
  const { cartItems } = getState().data;
  const { userId } = getState().data;
  if (userId) {
    try {
      await axios.post(`${BASE_URL}/cart`, { userId, cartItems });
    } catch (error) {
      console.error(error);
    }
  }
};

export const removeitems = (product) => async (dispatch, getState) => {
  const { data } = getState();
  const existingItem = data.cartItems.find(
    (item) => item.productID === product.productID
  );
  if (existingItem && existingItem.productSelectedQuantity > 1) {
    dispatch(
      produce(dataSlice.actions.removeitems, (draftState) => {
        const itemIndex = draftState.cartItems.findIndex(
          (item) => item.productID === product.productID
        );
        draftState.cartItems[itemIndex].productSelectedQuantity -= 1;
      })
    );
  } else {
    dispatch(dataSlice.actions.removeitems(product));
  }
  const { cartItems } = getState().data;
  const { userId } = getState().data;
  if (userId) {
    try {
      await axios.post(`${BASE_URL}/cart`, { userId, cartItems });
    } catch (error) {
      console.error(error);
    }
  }
};

export const checkout = () => async (dispatch, getState) => {
  const { data } = getState();
  const { cartItems } = data;
  try {
    await axios.post(`${BASE_URL}/checkout`, cartItems);
    dispatch(dataSlice.actions.checkout());
  } catch (error) {
    console.error(error);
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch(dataSlice.actions.signup(userData));
  try {
    const response = await axios.get(`${BASE_URL}/cart/${userData.userId}`);
    dispatch(
      produce((draftState) => {
        draftState.cartItems = response.data.cartItems;
        draftState.userId = userData.userId;
        draftState.userName = userData.userName;
      })
    );
    console.log(`Logged in as ${userData.userName} (ID: ${userData.userId})`);
  } catch (error) {
    console.error(error);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch(dataSlice.actions.login(userData));
  try {
    const response = await axios.get(`${BASE_URL}/cart/${userData.userId}`);
    dispatch(
      produce((draftState) => {
        draftState.cartItems = response.data.cartItems;
        draftState.userId = userData.userId;
        draftState.userName = userData.userName;
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(dataSlice.actions.logout());
};

export const dataSlice = createSlice({
  name: "data",
  initialState: productsAdapter.getInitialState({
    productItems: [],
    cartItems: [],
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
  }),
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
      state.cartItems.forEach((item) => {
        try {
          axios.post(`${BASE_URL}/checkout`, item);
        } catch (error) {
          console.error(error);
        }
      });
      state.cartItems = [];
    },
    signup: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userName", action.payload.userName);
    },
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userName", action.payload.userName);
    },
    logout: (state, action) => {
      state.cartItems = [];
      state.userId = null;
      state.userName = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductItems.fulfilled, (state, action) => {
      state.productItems = action.payload;
    });
  },
});

export default dataSlice.reducer;
