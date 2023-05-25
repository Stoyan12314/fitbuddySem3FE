import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import api from "../apis/register";
import useAuth from "../hooks/useAuth";
function Login() {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/OverviewExercises");
    }
  }, [auth, navigate]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const { email, password } = user;

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
          const accessToken = response.accessToken;
          const roles = response.roles;
          const id = response.userId;
          console.log("User id" + id);
          setErr("Login Succesffull");
          //set authentication context
          setAuth({ roles, accessToken, id });
          navigate("/OverviewExercises");
        })
        .catch((err) => setErr("Ivalid credentials"));
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
    <form onSubmit={(e) => onSubmit(e)} className={styles.cover}>
      <h1>Email</h1>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={onInputChange}
        className="email-input"
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

      {/* <button className="login-btn" type="submit">
        Login
      </button> */}
      <button className={styles["login-btn"]} type="submit">
        Login
      </button>

      {/* <div className="alt-register">
        <div className="login-btn" onClick={redirectToRegister}>
          Register
        </div>
      </div> */}
      <div className={styles["alt-register"]}>
        <div className={styles["login-btn"]} onClick={redirectToRegister}>
          Register
        </div>
      </div>

      <div className={`${styles.popupStyle} ${popupStyle}`}>
        <h3>{err}</h3>
      </div>

      {/* <div className={popupStyle}>
        <h3>{err}</h3>
      </div>  */}
    </form>
  );
}

export default Login;
