// components/Profile/CodeforcesSection.jsx
import { useState } from "react";


export default function CodeforcesSection({ user, darkMode, setUser }) {

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
      setUser(updatedUser.user);
      console.log("Codeforces ID updated successfully:", updatedUser.user);
      setCfId("");
    } else {
      console.error("Failed to update Codeforces ID");
    }
  };

  return (
    <div
      className={`flex flex-col space-y-6 items-center w-full max-w-md pt-2 pb-6 px-6 rounded-lg shadow-lg transition-colors ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <span className="text-lg font-semibold">CodeForces</span>
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
          <>
            <div className="flex w-full max-w-xs items-center">
              <span className="font-medium">Rank:</span>
              <span className="mx-2">{user.cfCurrentRank}</span>
            </div>
            <div className="flex w-full max-w-xs items-center">
              <span className="font-medium">Rating:</span>
              <span className="mx-2">{user.cfCurrentRating}</span>
            </div>
            <div className="flex w-full max-w-xs items-center">
              <span className="font-medium">Maximum Rating:</span>
              <span className="mx-2">{user.cfHighestRating}</span>
            </div>
            <div className="flex w-full max-w-xs items-center">
              <span className="font-medium">Maximum Rank:</span>
              <span className="mx-2">{user.cfHighestRank}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
