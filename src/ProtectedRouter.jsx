import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const {user}  = useContext(UserContext);

  const isUserLoggedIn = !!user?.id;

  if (!isUserLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};