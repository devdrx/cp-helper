import * as React from "react";
import { DropdownMenu } from "radix-ui";
import {useState} from 'react';
import {
  HamburgerMenuIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

const CalculatorDropdown = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("Number Theory");

  const handleCalculatorChange = (calculator) => {
    setSelectedCalculator(calculator);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none">
            <HamburgerMenuIcon className="w-6 h-6" />
            Select Calculator
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="w-72 bg-white shadow-lg rounded-lg py-2 border border-gray-200" sideOffset={8} align="center">
            {["Number Theory", "Combinatorics", "Binary Operations", "Custom Calculator"].map((calc) => (
              <DropdownMenu.Item 
                key={calc} 
                className="flex justify-between items-center px-4 py-3 text-lg text-gray-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCalculatorChange(calc)}
              >
                {calc}
                {selectedCalculator === calc && <CheckIcon className="w-5 h-5 text-green-600" />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">{selectedCalculator}</h2>
        <p className="text-gray-700 mt-2">{selectedCalculator} Calculator Form</p>
      </div>
    </div>
  );
};

export default CalculatorDropdown;
