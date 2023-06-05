import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import setNavigation from "../apis/navigationManager";

function NavBar() {
  var links = [];
  const { auth } = useAuth();
  const role = auth.roles;
  console.log("Roles use auth:" + role);
  links = setNavigation(role);

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
