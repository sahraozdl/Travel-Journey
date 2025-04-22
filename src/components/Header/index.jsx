import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const user = useAuth();
  const [userLoggedOutMessage, setUserLoggedOutMessage] = useState("");

  const handleLogout = async () => {
    try {
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

  return (
    <header className="header">
      <img src="/images/Globe.png" alt="Globe icon" className="header-logo" />
      <span className="header-title">my travel journal.</span>
      <nav className="header-nav">
        <ul className="header-nav-list">
          {!user && (
            <li>
              <NavLink to="/user/login" className="nav-btn" end>
                Login
              </NavLink>
            </li>
          )}
          {user && (
            <li className="header-nav-item">
              <button className="header-nav-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      {userLoggedOutMessage && (
        <p className="logout-message">{userLoggedOutMessage}</p>
      )}
    </header>
  );
}

export default Header;
