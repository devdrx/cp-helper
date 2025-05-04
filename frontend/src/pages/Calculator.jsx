// src/components/CalculatorDropdown.jsx
import React, { useContext, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { DarkModeContext } from "../App";
import CalculatorRenderer from "../components/CalculatorRenderer";
import calcDefs from "../assets/calculators.json";

export default function CalculatorDropdown() {
  const { darkMode } = useContext(DarkModeContext);
  const calculators = calcDefs.calculators || {};
  const keys = Object.keys(calculators);
  const [selected, setSelected] = useState(keys[0] || "");

  const bg = darkMode ? "bg-gray-800" : "bg-white";
  const text = darkMode ? "text-white" : "text-gray-900";
  const border = darkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className={`flex justify-between items-center ${bg} ${text} p-4 rounded-xl shadow-lg border ${border} transition-colors`}>        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 font-semibold rounded-lg transition ${hoverBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <div className="flex items-center gap-2">
                <HamburgerMenuIcon className="w-5 h-5" />
                <span className="capitalize">{selected.replace(/-/g, ' ')}</span>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={`mt-2 w-full rounded-lg border ${border} ${bg} shadow-lg py-2`}
              sideOffset={8}
              align="start"
            >
              {keys.map((key) => (
                <DropdownMenu.Item
                  key={key}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer transition ${hoverBg} ${text} capitalized ${selected === key ? 'font-bold' : 'font-medium'}`}
                  onSelect={() => setSelected(key)}
                >
                  <span>{key.replace(/-/g, ' ')}</span>
                  {selected === key && <CheckIcon className="w-5 h-5 text-green-500" />}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className={`${bg} ${text} p-6 mt-6 rounded-xl shadow-lg border ${border} transition-colors`}>        
        {selected ? (
          <CalculatorRenderer categoryKey={selected} />
        ) : (
          <p className="text-center text-sm text-gray-500">No calculators found.</p>
        )}
      </div>
    </div>
  );
}
