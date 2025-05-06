import { Routes, Route } from "react-router";
import { Login } from "./components/Auth/Login";
import { Home } from "./pages/Home";
import UserPage from "./pages/UserPage";

import { ProtectedRoute } from "./ProtectedRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/user/login" element={<Login />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
