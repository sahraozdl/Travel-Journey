import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";

function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userLoggedOutMessage, setUserLoggedOutMessage] = useState("");

  const handleLogout = async () => {
    try {
      navigate("/");
      await signOut(auth);
      setUserLoggedOutMessage("User logged out successfully.");
      setTimeout(() => {
        setUserLoggedOutMessage("");
      }, 3000);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <NavLink to="/" className="flex flex-row gap-2 items-center" end>
        <GlobeAsiaAustraliaIcon className="text-white h-12 w-12"/>
        <span className="text-xl font-bold">my travel journal.</span>
      </NavLink>
      <nav>
        <ul className="flex flex-row gap-6">
          {!user?.id ? (
            <li>
              <NavLink to="/user/login" className="nav-btn justify-end" end>
                Login
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/user" className="nav-btn ">
                  Profile
                </NavLink>
              </li>
              <li>
                {/*I will remove it to the settings later no need styling*/}
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {userLoggedOutMessage && (
      <p className="logout-message">{userLoggedOutMessage}</p>
    )}
      </nav>
    </header>
  );
}

export default Header;
