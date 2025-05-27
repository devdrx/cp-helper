import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useAuth } from "../context/AuthContext";
import defaultProfilePic from "../assets/defaultProfilePic.webp";

// Components
import PersonalInfoSection from "../components/Profile/PersonalInfoSection";
import CodeforcesSection from "../components/Profile/CodeforcesSection";
import MyPostSection from "../components/Profile/MyPostSection";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:5000/api/users/userInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  return (
    <div
      className={`flex flex-col  items-center min-h-screen p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex bg-gray-200 w-auto self-start gap-4 p-2 rounded-lg mb-4 text-sm font-semibold">
        {["personal", "codeforces", "mypost"].map((key) => (
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
              : "MY POST"}
          </span>
        ))}
      </div>

      {/* <div className="flex flex-col items-center">
        <img
          src={user.profilePicture || defaultProfilePic}
          alt="Profile"
          className="w-96 h-96 mb-4 object-cover border-2 rounded-lg border-blue-500"
        />
        <h2 className="text-xl font-semibold mb-1">{user.userName || "No Name"}</h2>
        <p className="text-sm text-gray-400 mb-4">{user.email || "No Email"}</p>
      </div> */}

      <div className="flex flex-col space-y-4 w-full max-w-2xl items-center">
        {activeSection === "personal" && (
          <PersonalInfoSection user={user} darkMode={darkMode} />
        )}
        {activeSection === "codeforces" && (
          <CodeforcesSection user={user} darkMode={darkMode} setUser={setUser} />
        )}
        {activeSection === "mypost" && <MyPostSection darkMode={darkMode} />}
      </div>
    </div>
  );
}
