import React from "react";
import { useState, useContext } from "react";
import { useAuth } from  "../../hooks/useAuth";
import { NavLink,useNavigate } from "react-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { UserDispatchContext,UserActionTypes } from "../../context/UserContext"; // not sure

function Header() {
  const { user, loading, dispatch } = useAuth();
  const navigate = useNavigate();
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
  if (loading) {
    return <div>Loading...</div>; // Optional: show a loading spinner while the auth check is happening
  }

  return (
    <header className="header">
      <NavLink to="/" className="header-logo-link" end>
      <img src="/images/Globe.png" alt="Globe icon" className="header-logo" />
      <span className="header-title">my travel journal.</span>
      </NavLink>
      <nav className="header-nav">
        <ul className="header-nav-list">{!user?.id ? (
            <li>
              <NavLink to="/user/login" className="nav-btn" end>
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
                <button
                  className="header-nav-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
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
