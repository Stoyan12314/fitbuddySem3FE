import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ element: children, ...rest }) {
  let { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Navigate to="/Login" state={{ from: location }} />
        )
      }
    />
  );
}

export default PrivateRoute;
