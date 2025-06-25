import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DarkModeContext } from "../App";

export default function Register() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("https://cp-helper-i6xy.onrender.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userName, email, password }),
      credentials: "include",
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className={`flex justify-center items-center min-h-screen p-4 transition-colors ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm p-6 rounded-lg shadow-lg transition-colors ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        

        <div className="mb-4">
          <label className="block mb-1" htmlFor="userName">
            Username
          </label>
          <input
            id="userName"
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className={`w-full p-2 rounded border focus:outline-none transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-100 border-gray-300 text-black focus:border-blue-600"
            }`}
            placeholder="username123"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2 rounded border focus:outline-none transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-100 border-gray-300 text-black focus:border-blue-600"
            }`}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-2 rounded border focus:outline-none transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-100 border-gray-300 text-black focus:border-blue-600"
            }`}
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`w-full p-2 rounded border focus:outline-none transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-100 border-gray-300 text-black focus:border-blue-600"
            }`}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 font-semibold rounded transition-all ${
            darkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className={`underline transition-colors ${
              darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
