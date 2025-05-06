import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from "@headlessui/react";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userLoggedOutMessage, setUserLoggedOutMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserLoggedOutMessage("You have been logged out successfully.");
      setTimeout(() => {
        setUserLoggedOutMessage("");
      }, 3000);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
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
                <button className="nav-btn"
                    onClick={() => setIsOpen(true)}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        
      </nav>
      
    </header>

    <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border-4 rounded-lg  border-blue-950 bg-amber-50 p-12">
            <DialogTitle className="font-bold text-xl text-center">You are logging out.</DialogTitle>
            <p>Are you sure you want to log out?</p>
            <div className="flex gap-4 justify-around">
              <Button
                className="rounded-3xl border-2 bg-blue-950 px-4 py-2 text-base font-semibold text-white hover:bg-red-950 active:bg-blue-950"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-3xl border-2 bg-blue-950 px-4 py-2 text-base font-semibold text-white hover:bg-red-950 active:bg-blue-950"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    {userLoggedOutMessage && (
      <p className="block bg logout-message">{userLoggedOutMessage}</p>
    )}
    </>
  );
}

export default Header;
