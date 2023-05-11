import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const userRole = JSON.parse(localStorage.getItem("roles"));

    if (token && userRole) {
      setAuth({ token, userRole });
      return token;
    }
  };

  return refresh;
};
export default useRefreshToken;
