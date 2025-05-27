// components/Profile/PersonalInfoSection.jsx
import defaulProfilePicture from "../../assets/defaultProfilePic.webp";
export default function PersonalInfoSection({ user, darkMode }) {
    return (
      <div
        className={`flex flex-col space-y-6 items-center w-full max-w-md pt-2 pb-6 px-6 rounded-lg shadow-lg transition-colors ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
                <img
                  src={user.profilePicture || defaulProfilePicture}
                  alt="Profile"
                  className="w-96 h-96  mb-4 object-cover border-2 rounded-lg border-blue-500"
                />
                <h2 className="text-xl font-semibold mb-1">
                  {user.userName || "No Name"}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{user.email || "No Email"}</p>
              </div>
  
        <div className="flex flex-col mt-4 space-y-2">
          <div className="flex w-full max-w-xs">
            <span className="font-medium">Role:</span>
            <span className="flex-1 text-center">{user.role || "User"}</span>
          </div>
          <div className="flex w-full max-w-xs">
            <span className="font-medium">Joined:</span>
            <span className="flex-1 text-center">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    );
  }
  