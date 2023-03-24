import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const links = [
    {
      id: 1,
      path: "/Login",
      text: "Login",
    },
    {
      id: 2,
      path: "/ExercisesPage",
      text: "Exercises",
    },
    {
      id: 3,
      path: "/Register",
      text: "Register",
    },
  ];

  return (
    <nav className={styles.navBar}>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink to={link.path}>{link.text}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
