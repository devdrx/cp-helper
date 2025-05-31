import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GraphEditor from "./pages/GraphEditor";
import Calculator from "./pages/Calculator";
import Documentation from "./pages/Documentation";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import PostCreate from "./pages/PostCreate";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import AutoLogoutWrapper from "./components/AutoLogoutWrapper"; // ✅ wrapper
// import { CodeforcesContext } from "./context/CodeforcesContext";
import { CodeforcesProvider } from "./context/CodeforcesContext";
import SubmitBlog from "./pages/SubmitBlog";
import SubmitBlogContest from "./pages/SubmitBlogContest";
import AllBlogs from "./pages/AllBlogs";

export const DarkModeContext = createContext();

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
        <Router>
          <AutoLogoutWrapper /> {/* ✅ Called AFTER <Router> is mounted */}
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/graph-editor" element={<GraphEditor />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* <Route path="/createpost" element={<PostCreate />} /> */}
            <Route path="/profile/" element={<Profile />} />
            <Route path="/submit-blog/problem/:problemId" element={<SubmitBlog />} />
            <Route path="/submit-blog/contest/:contestId" element={<SubmitBlogContest />} />
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </div>
    </DarkModeContext.Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CodeforcesProvider>
        <AppContent />
      </CodeforcesProvider>
    </AuthProvider>
  );
}
