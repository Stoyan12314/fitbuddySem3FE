import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModule.css";
import api from "../apis/register";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const { email, password } = user;

  const navigate = useNavigate();

  const [errorEmail, setErrorEmail] = useState(false);

  const checkEmail = (value) => {
    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)
    ) {
      setErrorEmail("Invalid Email");
      return false;
    } else {
      return true;
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkEmail(email)) {
      api
        .login(user)
        .then((response) => {
          if (response.data.status === "logged!") {
            setErr("Logged");
            popup();
          } else {
            setErr("Invalid credentials");
          }
        })
        .catch((err) => setErr("Invalid credentials"));
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="cover">
      <h1>Login</h1>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={onInputChange}
      />
      <h1>Password</h1>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={onInputChange}
      />

      <button className="login-btn" type="submit">
        Login
      </button>

      <div className="alt-register">
        <div className="login-btn" onClick={redirectToRegister}>
          Register
        </div>
      </div>

      <div className={popupStyle}>
        <h3>{err}</h3>
      </div>
    </form>
  );
}

export default Login;
