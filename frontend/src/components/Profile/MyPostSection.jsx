// components/Profile/MyPostSection.jsx
export default function MyPostSection({ darkMode }) {
    return (
      <div
        className={`flex flex-col items-center w-full max-w-md p-6 rounded-lg shadow-lg transition-colors ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">My Posts</h2>
        <p>Coming soon...</p>
      </div>
    );
  }
  