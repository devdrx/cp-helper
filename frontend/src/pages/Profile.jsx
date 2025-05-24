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
  const [cfId, setCfId] = useState("");

  const handleCfIdSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/users/linkCfId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ cf_id: cfId }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setCfId("");
    } else {
      console.error("Failed to update Codeforces ID");
    }
  };

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
    // else {
    //   navigate("/login");
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
        <h2 className="text-xl font-semibold mb-1">
          {user.userName || "No Name"}
        </h2>
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
              <span className="flex-1 text-center">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col space-y-6 items-center w-full max-w-md pt-2 pb-6 px-6 rounded-lg shadow-lg transition-colors ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <span className="text-lg font-semibold">CodeForces</span>

          {/* Increased spacing using mt-6 */}
          <div className="flex flex-col mt-4 space-y-2">
            <div className="flex w-full max-w-xs items-center">
              <span className="font-medium">Codeforces:</span>
              {user.codeforcesHandle ? (
                <span className="mx-2">{user.codeforcesHandle}</span>
              ) : (
                <div className="flex items-center ml-2 space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Codeforces ID"
                    value={cfId}
                    onChange={(e) => setCfId(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleCfIdSubmit}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Link
                  </button>
                </div>
              )}
            </div>

            {user.codeforcesHandle && (
              <div className="flex w-full max-w-xs items-center">
                <span className="font-medium">Rank:</span>
                <span className="mx-2">{user.cfCurrentRank}</span>
              </div>
            )}
            {user.codeforcesHandle && (
              <div className="flex w-full max-w-xs items-center">
                <span className="font-medium">Rating:</span>
                <span className="mx-2">{user.cfCurrentRating}</span>
              </div>
            )}
            {user.codeforcesHandle && (
              <div className="flex w-full max-w-xs items-center">
                <span className="font-medium">Maximum Rating:</span>
                <span className="mx-2">{user.cfHighestRating}</span>
              </div>
            )}
            {user.codeforcesHandle && (
              <div className="flex w-full max-w-xs items-center">
                <span className="font-medium">Maximum Rank:</span>
                <span className="mx-2">{user.cfHighestRank}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
