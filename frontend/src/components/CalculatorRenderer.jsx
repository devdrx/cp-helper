// src/components/CalculatorRenderer.jsx
import React, { useState, useEffect, useContext } from "react";
import calcDefs from "../assets/calculators.json";
import * as logic from "../utils/calcLogic";
import { DarkModeContext } from "../App";

export default function CalculatorRenderer({ categoryKey, functionKey }) {
  // Hooks must run unconditionally
  const { darkMode } = useContext(DarkModeContext);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  // Determine function definition and inputs
  const fnDef = calcDefs.calculators?.[categoryKey]?.[functionKey] || null;
  const inputs = fnDef?.inputs || [];

  // Reset form whenever category or function changes
  useEffect(() => {
    // Initialize values
    const initValues = inputs.reduce((acc, input) => {
      acc[input.name] = "";
      return acc;
    }, {});
    setValues(initValues);
    setResult(null);
  }, [categoryKey, functionKey, inputs]);

  // If no valid function, show fallback
  if (!fnDef) {
    return (
      <p className="text-red-500">
        No calculator found for {categoryKey} → {functionKey}
      </p>
    );
  }

  const { output, description, logicFn } = fnDef;
  const fn = logic[logicFn];

  // Styling tokens
  const inputBg = darkMode ? "bg-gray-700" : "bg-gray-100";
  const inputText = darkMode ? "text-white" : "text-gray-900";
  const inputBorder = darkMode ? "border-gray-600" : "border-gray-300";
  const placeholder = darkMode ? "placeholder-gray-400" : "placeholder-gray-500";

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const args = inputs.map(inp =>
      inp.type === "number" ? Number(values[inp.name]) : values[inp.name]
    );
    setResult(fn(...args));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
  <h2 className="text-2xl font-bold capitalize">{functionKey.replace(/-/g, " ")}</h2>
  <p className="text-sm text-gray-400">{description}</p>
</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputs.map(inp => (
          <div key={inp.name} className="space-y-1">
            <label htmlFor={inp.name} className="block font-medium">
              {inp.name}
            </label>
            <input
              id={inp.name}
              type={inp.type}
              value={values[inp.name]}
              onChange={e => handleChange(inp.name, e.target.value)}
              placeholder={inp.description}
              required
              className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${inputText} ${placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Compute
        </button>
      </form>

      {result !== null && (
        <div className={`p-4 rounded-lg border ${inputBorder} ${inputBg} ${inputText} transition-colors`}>
          <strong>Result ({output.type}):</strong> {String(result)}
          {output.description && (
            <p className="mt-1 text-sm text-gray-400">{output.description}</p>
          )}
        </div>
      )}
    </div>
  );
}