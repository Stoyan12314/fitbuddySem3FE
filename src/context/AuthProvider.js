import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRoles = localStorage.getItem("roles");
    const storedId = localStorage.getItem("id");
    console.log(
      "Items in auth provider: " + storedToken + storedRoles + storedId
    );
    if (storedToken && storedRoles && storedId) {
      const token = JSON.parse(storedToken);
      const roles = JSON.parse(storedRoles);
      const id = JSON.parse(storedId);
      setAuth({ token: token, roles: roles, id: id });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
