import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Signup.css";
import { BASE_URL } from "../../../config";

function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { emailId, Password, userName } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailId || !emailRegex.test(emailId)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    if (!Password || Password.length < 8) {
      setErrors({ password: "Password should be at least 8 characters long." });
      return;
    }

    setIsLoading(true);
    const response = await axios
      .post(
        `${BASE_URL}/auth/signup`,
        {
          username: userName,
          email: emailId,
          password: Password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.json();
        setIsLoading(false);

        toast.success(res.data.message);
        nav("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePasswordStrength = () => {
    const { Password } = formData;
    if (Password.length >= 8) return "strong";
    if (Password.length >= 6) return "medium";
    return "weak";
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src="/assets/darklogo.png" alt="Logo" />
      </Link>
      <div className="login-container">
        <h1>Sign-Up</h1>
        <form onSubmit={handleSignup}>
          <h5>User Name</h5>
          <input
            placeholder="UserName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <p className="error">{errors.userName}</p>}
          <h5>E-mail</h5>
          <input
            placeholder="Email"
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.emailId}</p>}
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <div className={`password-strength ${calculatePasswordStrength()}`}>
            Password strength
          </div>
          <div className="login-link">
            Already have an account? <Link to="/login"> Sign in</Link>
          </div>
          <button className="signup-button" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create your Amazon account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
