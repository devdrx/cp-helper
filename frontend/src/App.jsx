import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GraphEditor from "./pages/GraphEditor";
import Calculator from "./pages/Calculator";
import Documentation from "./pages/Documentation";

export const DarkModeContext = createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph-editor" element={<GraphEditor />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </Router>
      </div>
    </DarkModeContext.Provider>
  );
}
