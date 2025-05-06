import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GraphEditor from "./pages/GraphEditor";
import Calculator from "./pages/Calculator";
import Documentation from "./pages/Documentation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostCreate from "./pages/PostCreate";
import Profile from "./pages/Profile";
import { AuthContext, AuthProvider } from "./context/AuthContext";

export const DarkModeContext = createContext();
// export const AuthContext = createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <AuthProvider>
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Home />} />
              <Route path="/graph-editor" element={<GraphEditor />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/createpost" element={<PostCreate />} />
              <Route path="/profile/" element={<Profile/>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </DarkModeContext.Provider>
  );
}
