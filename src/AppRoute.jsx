import { Routes, Route } from "react-router";
import { Login } from "./components/Auth/Login";
import TravelList from "./pages/TravelList";
import { Home } from "./pages/Home";
export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<TravelList />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="*" element={<TravelList />} />
    </Routes>
  );
};
