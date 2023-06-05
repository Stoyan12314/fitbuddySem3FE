// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css"; // Import the CSS module
// import api from "../apis/register";

// function Login() {
//   const [err, setErr] = useState("");
//   let navigate = useNavigate();

//   const [popupStyle, showPopup] = useState("hide");
//   const popup = () => {
//     showPopup("login-popup");
//     setTimeout(() => showPopup("hide"), 3000);
//   };

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const { firstName, lastName, email, password, role } = user;

//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const redirectToLogin = () => {
//     navigate("/Login");
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     api
//       .register(user)
//       .then((response) => {
//         navigate("/Login");
//       })
//       .catch((err) => {
//         console.log(err);
//         if (err.response && err.response.status === 409) {
//           setErr("This email is already in use. Please use a different email.");
//         } else {
//           setErr("All fields must be filled in. Please, try again.");
//         }
//         popup();
//       });
//   };

//   return (
//     <form onSubmit={(e) => onSubmit(e)} className={styles.cover}>
//       <h1>Email</h1>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={onInputChange}
//       />
//       <h1>Password</h1>
//       <input
//         id="password"
//         name="password"
//         type="password"
//         placeholder="Enter password"
//         value={password}
//         onChange={onInputChange}
//       />
//       <h1>First name</h1>
//       <input
//         id="firstName"
//         name="firstName"
//         type="text"
//         placeholder="Enter first name"
//         value={firstName}
//         onChange={onInputChange}
//       />

//       <h1>Last name</h1>
//       <input
//         id="lastName"
//         name="lastName"
//         type="text"
//         placeholder="Enter last name"
//         value={lastName}
//         onChange={onInputChange}
//       />

//       <div>
//         <label htmlFor="role">Select Role:</label>
//         <select name="role" value={role} onChange={(e) => onInputChange(e)}>
//           <option value="">Select Role</option>
//           <option value="CUSTOMER">CUSTOMER</option>
//           <option value="TRAINER">TRAINER</option>
//           <option value="ADMINISTRATION">ADMINISTRATION</option>
//         </select>
//       </div>

//       <button className={styles["login-btn"]} type="submit">
//         Register
//       </button>

//       <button className={styles["login-btn"]} onClick={redirectToLogin}>
//         Login
//       </button>

//       <div className={popupStyle}>
//         <h3>{err}</h3>
//       </div>
//     </form>
//   );
// }
// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import api from "../apis/register";

function Login() {
  const [err, setErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const [popupStyle, showPopup] = useState("hide");
  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const { firstName, lastName, email, password, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirectToLogin = () => {
    navigate("/Login");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr("Passwords do not match. Please, try again.");
      popup();
      return;
    }

    api
      .register(user)
      .then((response) => {
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 409) {
          setErr("This email is already in use. Please use a different email.");
        } else {
          setErr("All fields must be filled in. Please, try again.");
        }
        popup();
      });
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

      <h1>Confirm Password</h1>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <h1>First name</h1>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={onInputChange}
      />

      <h1>Last name</h1>
      <input
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Enter last name"
        value={lastName}
        onChange={onInputChange}
      />

      {/* <div>
        <label htmlFor="role">Select Role:</label>
        <select name="role" value={role} onChange={onInputChange}>
          <option value="">Select Role</option>
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="TRAINER">TRAINER</option>
          <option value="ADMINISTRATION">ADMINISTRATION</option>
        </select>
      </div> */}

      <button className={styles["login-btn"]} type="submit">
        Register
      </button>

      <button className={styles["login-btn"]} onClick={redirectToLogin}>
        Login
      </button>

      <div className={popupStyle}>
        <h3>{err}</h3>
      </div>
    </form>
  );
}
export default Login;
