import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const userRole = JSON.parse(localStorage.getItem("roles"));
    const id = JSON.parse(localStorage.getItem("id"));
    if (token && userRole && id) {
      setAuth({ token, userRole, id });
      return token;
    }
  };

  return refresh;
};
export default useRefreshToken;
