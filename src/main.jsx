import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Checkout from "./components/Checkout";
import { DataProvider } from "./components/DataProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
      <RouterProvider router={router} />,
  </DataProvider>
);
