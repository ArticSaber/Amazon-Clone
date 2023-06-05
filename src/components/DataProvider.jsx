import React, { useState, useEffect, useReducer } from "react";
import { createContext } from "react";
import supabase from "../supabase";
import axios from "axios";

const reducer = (state, dispatch) => {
  switch (action.type) {
    case "addcart": {
      const ProductExist = cartItems.find((item) => item.id === product.id);
      if (ProductExist) {
        return {
          ...state,
          cartItems: cartItems.map((item) =>
            item.id === product.id
              ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...cartItems, { ...product, quantity: 1 }],
        };
      }
      break;
    }
    case "removecart": {
      break;
    }

    default:
      break;
  }
};

export const DataContext = createContext();
export function DataProvider({ children }) {
  // cosnt {Email, setEmail,Password, setPassword,Userid, setUserid,}
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Userid, setUserid] = useState("");
  const [UserName, setUserName] = useState("");
  // const [cartItems, setcartItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    cartItems: [],
  });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProductItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setcartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setcartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setcartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setcartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  useEffect(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (Userid == null) {
      setUserid(data.session.user.id);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        Email,
        setEmail,
        Password,
        setPassword,
        Userid,
        setUserid,
        UserName,
        setUserName,
        productItems,
        setProductItems,
        handleAddProduct,
        handleRemoveProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
