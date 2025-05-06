import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const { setIsLoggedIn } = useAuth(); // Get the setter
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsLoggedIn(true); // <--- This updates Header reactively
      navigate("/");
    }    
    else {
      const errorData = await response.json();
      setError(errorData.message || "Login failed. Please try again.");
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
        <h2 className="text-2xl font-semibold mb-6">Login to CP Tool</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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

        <div className="mb-6">
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

        <button
          type="submit"
          className={`w-full py-2 font-semibold rounded transition-all ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className={`underline transition-colors ${
              darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
