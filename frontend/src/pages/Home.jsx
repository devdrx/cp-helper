import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function Home() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      Home Page
    </div>
  );
}
