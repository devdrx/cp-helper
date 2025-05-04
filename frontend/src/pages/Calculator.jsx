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
  const categories = Object.keys(calcDefs.calculators || {});

  // Two-level selection: category and function
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
  const functions = selectedCategory
    ? Object.keys(calcDefs.calculators[selectedCategory])
    : [];
  const [selectedFunction, setSelectedFunction] = useState(
    functions[0] || ""
  );

  // theme classes
  const bg = darkMode ? "bg-gray-800" : "bg-white";
  const text = darkMode ? "text-white" : "text-gray-900";
  const border = darkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        className={`flex items-center justify-between ${bg} ${text} p-4 rounded-xl shadow-lg border ${border} transition-colors`}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 font-semibold rounded-lg transition ${hoverBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <div className="flex items-center gap-2">
                <HamburgerMenuIcon className="w-5 h-5" />
                <span className="capitalize">
                  {selectedCategory.replace(/-/g, " ")}
                </span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={`mt-2 w-full rounded-lg border ${border} ${bg} shadow-lg py-2`}
              sideOffset={8}
              align="start"
            >
              {/* Categories */}
              {categories.map((cat) => (
                <DropdownMenu.Sub key={cat}>
                  <DropdownMenu.SubTrigger
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition ${hoverBg} ${text} capitalize ${
                      selectedCategory === cat ? "font-bold" : "font-medium"
                    }`}
                  >
                    {cat.replace(/-/g, " ")}
                    <ChevronDownIcon className="w-4 h-4" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      className={`ml-4 mt-1 w-60 rounded-lg border ${border} ${bg} shadow-lg py-2`}
                      sideOffset={4}
                      align="start"
                    >
                      {/* Functions */}
                      {Object.keys(calcDefs.calculators[cat]).map((fnKey) => (
                        <DropdownMenu.Item
                          key={fnKey}
                          className={`flex items-center justify-between px-4 py-2 cursor-pointer transition ${hoverBg} ${text} capitalize ${
                            selectedFunction === fnKey && selectedCategory === cat
                              ? "font-bold"
                              : "font-medium"
                          }`}
                          onSelect={() => {
                            setSelectedCategory(cat);
                            setSelectedFunction(fnKey);
                          }}
                        >
                          {fnKey.replace(/-/g, " ")}
                          {selectedFunction === fnKey && selectedCategory === cat && (
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

      <div
        className={`${bg} ${text} p-6 mt-6 rounded-xl shadow-lg border ${border} transition-colors`}
      >
        {selectedFunction ? (
          <CalculatorRenderer
            categoryKey={selectedCategory}
            functionKey={selectedFunction}
          />
        ) : (
          <p className="text-center text-sm text-gray-500">
            Please select a calculator.
          </p>
        )}
      </div>
    </div>
  );
}
