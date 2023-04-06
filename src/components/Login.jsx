import React, { useContext } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataProvider";
import "./Login.css";
function Login() {
  const { Email, setEmail, Password, setPassword, setUserid } =
    useContext(DataContext);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });
    setUserid(data.user.id);
    if (data.user.id) nav("/");
    console.log(data);
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src="/assets/darklogo.png" />
      </Link>
      <div className="login-container">
        <h1>Sign-In</h1>

        <form>
          <h5>E-mail</h5>
          <input
            placeholder="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="password"
            value={Password}
            onChange={(e) => setPassword(() => e.target.value)}
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
        <button
          className="register-button"
          // onClick={handleSignup}
          type="submit"
        >
          Create your Amazon account
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
