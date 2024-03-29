import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import AdminForm from "./components/adminlogin/adminForm"
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { fetchProductItems } from "./redux/dataSlice";

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
  {
    path: "/admin",
    element:<AdminForm/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="colored"
    />
  </Provider>
);

store.dispatch(fetchProductItems());
