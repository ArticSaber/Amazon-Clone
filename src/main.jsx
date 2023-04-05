import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Checkout from "./components/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reducer, { initialState } from "./components/reducer";
import StateProvider from "./components/StateProvider";
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
    element: <h1>Login page</h1>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    ,
  </React.StrictMode>
);
