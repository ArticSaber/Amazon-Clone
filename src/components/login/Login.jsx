import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/dataSlice";
import { BASE_URL } from "../../../config";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailId: "",
    Password: "",
  });
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailId, Password } = formData;

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailId,
          password: Password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { userId, userName } = data;
      dispatch(login({ userId, userName }));
      toast.info("Successfully logged in!");
      nav("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src="/assets/darklogo.png" alt="Logo" />
      </Link>
      <div className="login-container">
        <h1>Sign-In</h1>

        <form>
          <h5>E-mail</h5>
          <input
            placeholder="Email"
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleInputChange}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={formData.Password}
            onChange={handleInputChange}
          />
          <button className="login-button" onClick={handleLogin}>
            Continue
          </button>
        </form>
        <p>
          By Continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice
        </p>
        <Link to="/Signup">
          <button className="register-button">Create your Amazon account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;