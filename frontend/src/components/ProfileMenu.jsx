import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // import context

function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // use logout from context

  const handleLogout = () => {
    logout(); // clear token + update state
    navigate("/login");
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

export default ProfileMenu;
