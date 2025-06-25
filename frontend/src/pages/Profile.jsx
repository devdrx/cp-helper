import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useAuth } from "../context/AuthContext";
import defaultProfilePic from "../assets/defaultProfilePic.webp";

// Components
import PersonalInfoSection from "../components/Profile/PersonalInfoSection";
import CodeforcesSection from "../components/Profile/CodeforcesSection";
import MyPostSection from "../components/Profile/MyPostSection";
import Multiverse from "../components/Profile/Multiverse";

export default function Profile() {
  const { isLoggedIn, logout } = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/userInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status === 401) {
          console.warn("Token expired. Logging out...");
          logout();
          navigate("/login");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn, navigate, logout]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Tabs */}
      <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex  w-auto self-start gap-4 p-2 rounded-lg mb-4 text-sm font-semibold`}>
        {["personal", "codeforces", "multiverse"].map((key) => (
          <span
            key={key}
            className={`cursor-pointer px-2 py-1 rounded ${
              activeSection === key
                ? "bg-gray-700 text-white"
                : "hover:font-bold"
            }`}
            onClick={() => setActiveSection(key)}
          >
            {key === "personal"
              ? "PERSONAL INFO"
              : key === "codeforces"
              ? "CODEFORCES"
              : "MULTIVERSE"}
          </span>
        ))}

        {/* MY POST + Dropdown */}
        {/* MY POST + Dropdown */}
        <div className="relative flex items-center gap-1" ref={dropdownRef}>
          <span
            className={`px-2 py-1 rounded ${
              ["contests", "problems"].includes(activeSection)
                ? "bg-gray-700 text-white"
                : ""
            }`}
          >
            MY POST
          </span>
          <span
            className={`cursor-pointer text-xs px-1 
    }`}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            ▼
          </span>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 flex flex-col bg-white text-black border rounded shadow-md z-10 min-w-[120px]">
              <span
                onClick={() => {
                  setActiveSection("contests");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Contests
              </span>
              <span
                onClick={() => {
                  setActiveSection("problems");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Problems
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex  space-y-4 w-full max-w-6xl justify-center">
        {activeSection === "personal" && (
          <PersonalInfoSection user={user} darkMode={darkMode} />
        )}
        {activeSection === "codeforces" && (
          <CodeforcesSection
            user={user}
            darkMode={darkMode}
            setUser={setUser}
          />
        )}
        {activeSection === "multiverse" && (
          <Multiverse darkMode={darkMode} setUser={setUser} />
        )}
        {["contests", "problems"].includes(activeSection) && (
          <MyPostSection
            user={user}
            section={activeSection}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}
