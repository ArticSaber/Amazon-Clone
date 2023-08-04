import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";
import "./Login.css";

function Login() {
  const { state, dispatch } = useContext(DataContext); // Destructure dispatch from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.info("Successfully logged in!");
      dispatch({
        type: "login",
        userId: data.user.id,
        userMail: data.user.email,
      });
      console.log(data.user.id);
      console.log(data.user.email);
      setFormData((prevData) => ({ ...prevData, password: "" }));
      if (data.user.id) {
        nav("/");
      }
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button className="login-button" onClick={handleLogin} type="submit">
            Continue
          </button>
        </form>
        <p>
          By Continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice
        </p>
        <Link to="/Signup">
          <button className="register-button" type="submit">
            Create your Amazon account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
