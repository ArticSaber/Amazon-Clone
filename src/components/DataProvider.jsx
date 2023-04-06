import React, { useState, useEffect } from "react";
import { createContext } from "react";
import supabase from "../supabase";
import Data from "./Data";

export const DataContext = createContext();
export function DataProvider({ children }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Userid, setUserid] = useState("");
  const [cartItems, setcartItems] = useState([])
  const { productItems } = Data;

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
    setUserid(data.session.user.id);
  }, []);

  return (
    <DataContext.Provider
      value={{
        Email,
        setEmail,
        Password,
        setPassword,
        Userid,
        setUserid,
        cartItems,
        setcartItems,
        productItems,
        handleAddProduct,
        handleRemoveProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;