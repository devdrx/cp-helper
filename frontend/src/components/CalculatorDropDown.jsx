// src/components/CalculatorDropdown.jsx
import React, { useContext, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import { DarkModeContext } from "../App";
import CalculatorRenderer from "./CalculatorRenderer";
import calcDefs from "../data/calculators.json";

export default function CalculatorDropdown() {
  const { darkMode } = useContext(DarkModeContext);

  // Safe extraction of calculators object
  const calculators = (calcDefs && calcDefs.calculators) || {};
  const calculatorKeys = Object.keys(calculators);

  if (calculatorKeys.length === 0) {
    console.error(
      "[CalculatorDropdown] No calculators found – check calculators.json format"
    );
  }

  const [selectedCalculator, setSelectedCalculator] = useState(
    calculatorKeys[0] || ""
  );

  const handleCalculatorChange = (key) => {
    setSelectedCalculator(key);
  };

  const buttonClasses = [
    "flex items-center gap-2 px-4 py-2 text-lg font-medium",
    "rounded-lg shadow-md transition-colors focus:outline-none",
    darkMode
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ].join(" ");

  const contentClasses = [
    "w-72 rounded-lg py-2 border transition-colors shadow-lg",
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
  ].join(" ");

  const itemClasses = (isSelected) =>
    [
      "flex justify-between items-center px-4 py-3 text-lg rounded cursor-pointer transition-colors",
      darkMode
        ? isSelected
          ? "bg-gray-700 text-white"
          : "text-gray-200 hover:bg-gray-700"
        : isSelected
        ? "bg-gray-200 text-gray-900"
        : "text-gray-900 hover:bg-gray-100",
    ].join(" ");

  const displayClasses = [
    "mt-6 p-4 rounded-lg shadow-md transition-colors",
    darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900",
  ].join(" ");

  return (
    <div className="relative w-full max-w-md mx-auto">
      {calculatorKeys.length === 0 ? (
        <p className="text-center text-red-500">
          No calculators available. Please check your JSON.
        </p>
      ) : (
        <>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className={buttonClasses}>
                <HamburgerMenuIcon className="w-6 h-6" />
                {selectedCalculator.replace(/-/g, " ")}
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={contentClasses}
                sideOffset={8}
                align="center"
              >
                {calculatorKeys.map((key) => (
                  <DropdownMenu.Item
                    key={key}
                    className={itemClasses(selectedCalculator === key)}
                    onSelect={() => handleCalculatorChange(key)}
                  >
                    {key.replace(/-/g, " ")}
                    {selectedCalculator === key && (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    )}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <div className={displayClasses}>
            <CalculatorRenderer categoryKey={selectedCalculator} />
          </div>
        </>
      )}
    </div>
  );
}
