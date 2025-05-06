import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useAuth } from "../context/AuthContext";
import defaultProfilePic from "../assets/defaultProfilePic.webp"; // Import the default profile picture

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Redirect to login if not logged in
    // if (!isLoggedIn || localStorage.getItem("isLoggedIn") !== "true") {
    //   navigate("/login");
    // } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    // }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture || defaultProfilePic}
            alt="Profile"
            className="w-96 h-96  mb-4 object-cover border-2 rounded-lg border-blue-500"
          />
          <h2 className="text-xl font-semibold mb-1">{user.userName || "No Name"}</h2>
          <p className="text-sm text-gray-400 mb-4">{user.email || "No Email"}</p>
        </div>
        <div className="flex flex-col space-y-4 w-full max-w-2xl items-center">

          <div
            className={`flex flex-col space-y-6 items-center w-full max-w-md pt-2 pb-6 px-6 rounded-lg shadow-lg transition-colors ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <span className="text-lg font-semibold">Personal Information</span>

            {/* Increased spacing using mt-6 */}
            <div className="flex flex-col mt-4 space-y-2">
            <div className="flex w-full max-w-xs">
              <span className="font-medium">Role:</span>
              <span className="flex-1 text-center">{user.role || "User"}</span>
            </div>

              <div className="flex w-full max-w-xs">
                <span className="font-medium">Joined:</span>{" "}
                <span className="flex-1 text-center">{user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}</span>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col space-y-6 items-center w-full max-w-md pt-2 pb-6 px-6 rounded-lg shadow-lg transition-colors ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <span className="text-lg font-semibold">Platforms Linked</span>

            {/* Increased spacing using mt-6 */}
            <div className="flex flex-col mt-4 space-y-2">
              <div className="flex w-full max-w-xs">
                <span className="font-medium">Codeforces:</span>{" "}
                <span className="flex-1 text-center">{user.cf_id || "User"}</span>
              </div>
              <div className="flex w-full max-w-xs">
                <span className="font-medium">Codechef:</span>{" "}
                <span className="flex-1 text-center">{user.cc_id ||  "N/A"}</span>
              </div>
              <div className="flex w-full max-w-xs">
                <span className="font-medium">Leetcode:</span>{" "}
                <span className="flex-1 text-center">{user.cc_id ||  "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}
