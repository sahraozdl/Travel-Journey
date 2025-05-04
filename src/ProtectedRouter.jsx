import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const {user, loading}  = useContext(UserContext);

  const isUserLoggedIn = !!user?.id;

  if (loading){
    return <div>Loading...</div>;
  }

  if (!isUserLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};