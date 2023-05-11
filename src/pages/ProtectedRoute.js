import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.token;
  const userRole = auth.userRole;

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/Forbidden" />;
  }

  return element;
};

export default ProtectedRoute;
