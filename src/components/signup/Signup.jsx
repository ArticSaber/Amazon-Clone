import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
import supabase from "../../supabase";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, userName } = formData;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }


    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long.");
      return;
    }

 
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (data?.user?.id) {
      nav("/Login");
      toast.info("Successfully signed up!");
    } else if (error) {
      toast.error(error.message);
    }
  };

  const calculatePasswordStrength = () => {
    const { password } = formData;
    if (password.length >= 8) return "strong";
    if (password.length >= 6) return "medium";
    return "weak";
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
        <h1>Sign-Up</h1>
        <form>
          <h5>User Name</h5>
          <input
            placeholder="UserName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
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
          <div className={`password-strength ${calculatePasswordStrength()}`}>
            Password strength
          </div>
        </form>
        <button className="signup-button" onClick={handleSignup} type="submit">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Signup;
