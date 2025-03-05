import { useContext } from "react";
import { Link } from "react-router-dom";
import * as Switch from "@radix-ui/react-switch";
import { DarkModeContext } from "../App";

export default function Header() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`w-full p-4 flex justify-between items-center border-b ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <nav className="flex gap-6">
        <Link to="/" className="font-semibold">CP Tool</Link>
        <Link to="/graph-editor" className="font-semibold">Graph Editor</Link>
        <Link to="/calculator" className="font-semibold">Calculator</Link>
        <Link to="/documentation" className="font-semibold">Documentation</Link>
      </nav>
      <div className="flex items-center gap-2">
        <span>Dark Mode</span>
        <Switch.Root
          checked={darkMode}
          onCheckedChange={() => setDarkMode(!darkMode)}
          className="w-10 h-6 bg-gray-400 rounded-full relative"
        >
          <Switch.Thumb className={`absolute w-4 h-4 bg-white rounded-full transition-all top-1 ${darkMode ? 'right-1' : 'left-1'}`} />
        </Switch.Root>
      </div>
    </div>
  );
}
