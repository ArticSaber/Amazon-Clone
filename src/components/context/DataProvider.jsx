import React, { useReducer, useEffect, createContext, useContext } from "react";
import axios from "axios";
import supabase from "../../supabase";

const reducer = (state, action) => {
  switch (action.type) {
    case "loadProducts":
      return { ...state, productItems: action.products };
    case "addcart": {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.product.id
      );

      if (productIndex !== -1) {
        const updatedCart = state.cartItems.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return { ...state, cartItems: updatedCart };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
        };
      }
    }
    case "removecart": {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.product.id
      );

      if (productIndex !== -1) {
        const updatedCart = state.cartItems
          .map((item) =>
            item.id === action.product.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        return { ...state, cartItems: updatedCart };
      }
      return state;
    }
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
        userMail: action.payload.userMail,
      };
    case "LOGOUT":
      return { ...state, userId: null, userMail: null };
    default:
      return state;
    case "CHECKOUT":
      return { ...state, cartItems: [] };
  }
};

const DataContext = createContext();

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    cartItems: [],
    productItems: [],
    userId: null,
    userMail: null,
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      dispatch({ type: "loadProducts", products: response.data });
    });

    const fetchUserCart = async () => {
      if (state.userId) {
        const { data, error } = await supabase
          .from("carts")
          .select("cart_items")
          .eq("user_id", state.userId)
          .single();

        if (data && data.cart_items) {
          dispatch({ type: "loadCart", cartItems: data.cart_items });
        }
      }
    };

    fetchUserCart();
  }, [state.userId]);

  const uploadCartToDatabase = async (cartItems, userId) => {
    const { data, error } = await supabase
      .from("carts")
      .insert([{ user_id: userId, cart_items: cartItems }])
      .select();
  };

  useEffect(() => {
    if (state.userId) {
      uploadCartToDatabase(state.cartItems, state.userId);
    }
  }, [state.cartItems, state.userId]);

  const handleCheckout = async () => {
    dispatch({ type: "CHECKOUT" });
    if (state.userId) {
      await uploadCartToDatabase([], state.userId);
    }
  };

  (async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          userId: user.id,
          userMail: user.email,
        },
      });
    }
  })();

  const handleAddProduct = (product) => {
    dispatch({ type: "addcart", product });
  };

  const handleRemoveProduct = (product) => {
    dispatch({ type: "removecart", product });
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        handleAddProduct,
        handleRemoveProduct,
        uploadCartToDatabase,
        handleCheckout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataContext, DataProvider, useData };
