// src/components/Header.jsx

import { useContext } from "react";
import { Link } from "react-router-dom";
import * as Switch from "@radix-ui/react-switch";
import { DarkModeContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove only auth-related data
    setIsLoggedIn(false);   
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="relative ml-2">
      <div
        className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        P
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-50 border">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}


export default function Header() {

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`w-full p-4 flex justify-between items-center border-b ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>

      <nav className="flex gap-6">
        <Link to="/" className="font-semibold">CP Tool</Link>
        <Link to="/graph-editor" className="font-semibold">Graph Editor</Link>
        <Link to="/calculator" className="font-semibold">Calculator</Link>
        <Link to="/documentation" className="font-semibold">Documentation</Link>
      </nav>
      <div className="flex items-center gap-2">
        <span>Dark Mode</span>
        <Switch.Root
          checked={darkMode}
          onCheckedChange={() => setDarkMode(!darkMode)}
          className="w-10 h-6 bg-gray-400 rounded-full relative"
        >
          <Switch.Thumb className={`absolute w-4 h-4 bg-white rounded-full transition-all top-1 ${darkMode ? 'right-1' : 'left-1'}`} />
        </Switch.Root>
        {isLoggedIn ? <ProfileMenu /> : (
  <Link to="/login" className="font-semibold bg-blue-600 p-2 border-1 rounded-lg border-black ml-2 text-white">
    Login
  </Link>
)}

      </div>
    </div>
  );
}