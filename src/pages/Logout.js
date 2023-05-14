import * as React from "react";
import AuthenticationService from "../apis/register";
import useEffect from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  React.useEffect(() => {
    setAuth(false);
    AuthenticationService.logout();
    navigate("/login");
  }, [navigate, setAuth]);

  return null;
}

export default Logout;
