import React, { useState, useEffect } from "react";
import { createContext } from "react";
import supabase from "../supabase";

export const DataContext = createContext();
export function DataProvider({ children }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Userid, setUserid] = useState("");
 
    useEffect(async () => {
        const { data, error } = await supabase.auth.getSession();
        setUserid(data.session.user.id);
    },[])

  return (
    <DataContext.Provider
      value={{
        Email,
        setEmail,
        Password,
        setPassword,
        Userid,
        setUserid,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;

