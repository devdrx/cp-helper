// src/components/CalculatorDropdown.jsx
import React, { useContext, useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { DarkModeContext } from "../App";
import CalculatorRenderer from "./CalculatorRenderer";
import calcDefs from "../assets/calculators.json";

export default function CalculatorDropdown() {
  const { darkMode } = useContext(DarkModeContext);
  const categories = Object.keys(calcDefs.calculators || {});

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
  const functions = selectedCategory
    ? Object.keys(calcDefs.calculators[selectedCategory])
    : [];
  const [selectedFunction, setSelectedFunction] = useState("");

  // Initialize and reset function selection when category or functions list changes
  useEffect(() => {
    setSelectedFunction(functions[0] || "");
  }, [selectedCategory, functions]);

  const bg = darkMode ? "bg-gray-800" : "bg-white";
  const text = darkMode ? "text-white" : "text-gray-900";
  const border = darkMode ? "border-gray-700" : "border-gray-200";
  const hover = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className={`p-4 rounded-xl shadow-lg border ${border} ${bg} ${text}`}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={`flex justify-between items-center w-full px-4 py-3 rounded-lg font-semibold ${hover} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <div className="flex items-center gap-2">
                <HamburgerMenuIcon className="w-5 h-5" />
                <span className="capitalize">{selectedCategory.replace(/-/g, ' ')}</span>
                <span className="mx-1">-</span>
                <span className="capitalize">{selectedFunction.replace(/-/g, ' ')}</span>
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
              {categories.map((cat) => (
                <DropdownMenu.Sub key={cat}>
                  <DropdownMenu.SubTrigger
                    className={`flex justify-between items-center px-4 py-2 rounded ${hover} ${text} font-medium capitalize`}
                  >
                    {cat.replace(/-/g, ' ')}
                    <ChevronDownIcon className="w-4 h-4" />
                  </DropdownMenu.SubTrigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      className={`ml-4 mt-1 w-60 rounded-lg border ${border} ${bg} shadow-lg py-2`}
                      sideOffset={4}
                      align="start"
                    >
                      {Object.keys(calcDefs.calculators[cat]).map((fnKey) => (
                        <DropdownMenu.Item
                          key={fnKey}
                          className={`flex justify-between items-center px-4 py-2 rounded ${hover} ${text} capitalize ${
                            selectedCategory === cat && selectedFunction === fnKey
                              ? 'font-bold'
                              : 'font-medium'
                          }`}
                          onSelect={() => {
                            setSelectedCategory(cat);
                            setSelectedFunction(fnKey);
                          }}
                        >
                          {fnKey.replace(/-/g, ' ')}
                          {selectedCategory === cat && selectedFunction === fnKey && (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          )}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className={`mt-6 p-6 rounded-xl shadow-lg border ${border} ${bg} ${text}`}>
        {selectedFunction ? (
          <CalculatorRenderer
            categoryKey={selectedCategory}
            functionKey={selectedFunction}
          />
        ) : (
          <p className="text-center text-gray-500">Please select a calculator.</p>
        )}
      </div>
    </div>
  );
}