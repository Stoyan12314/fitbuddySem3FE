import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const userRole = JSON.parse(localStorage.getItem("roles"));

    if (token && userRole) {
      setAuth({ token, userRole });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
