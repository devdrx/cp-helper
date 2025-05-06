// src/components/CalculatorRenderer.jsx
import React, { useState, useEffect, useContext } from "react";
import calcDefs from "../assets/calculators.json";
import * as logic from "../utils/calcLogic";
import { DarkModeContext } from "../App";

export default function CalculatorRenderer({ categoryKey, functionKey }) {
  const { darkMode } = useContext(DarkModeContext);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  // Get function definition
  const fnDef = calcDefs.calculators?.[categoryKey]?.[functionKey] || null;
  const inputs = fnDef?.inputs || [];
  const { output, description, logicFn } = fnDef || {};
  const fn = logic[logicFn];

  // Reset form when selection changes
  useEffect(() => {
    const init = inputs.reduce((acc, inp) => ({ ...acc, [inp.name]: "" }), {});
    setValues(init);
    setResult(null);
  }, [categoryKey, functionKey, inputs]);

  if (!fnDef) {
    return (
      <p className="text-red-500 p-4">No calculator found for {categoryKey} → {functionKey}</p>
    );
  }

  // Styling
  const containerBg = darkMode ? "bg-gray-800" : "bg-white";
  const containerBorder = darkMode ? "border-gray-600" : "border-gray-300";
  const inputBg = darkMode ? "bg-gray-700" : "bg-gray-100";
  const inputText = darkMode ? "text-white" : "text-gray-900";
  const inputBorder = darkMode ? "border-gray-600" : "border-gray-300";
  const placeholder = darkMode ? "placeholder-gray-400" : "placeholder-gray-500";

  const handleChange = (name, val) => setValues(prev => ({ ...prev, [name]: val }));

  const handleSubmit = e => {
    e.preventDefault();
    const args = inputs.map(i => (i.type === "number" ? +values[i.name] : values[i.name]));
    setResult(fn(...args));
  };

  return (
    <div className={`${containerBg} border ${containerBorder} rounded-xl p-6 space-y-6 transition-colors`}>
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold capitalize">{functionKey.replace(/-/g, ' ')}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputs.map(inp => (
          <div key={inp.name} className="mb-4">
            <label htmlFor={inp.name} className="block mb-1 font-medium">
              {inp.name}
            </label>
            <input
              id={inp.name}
              type={inp.type}
              value={values[inp.name] ?? ""}
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

      {/* Result */}
      {result !== null && (
        <div className={`p-4 rounded-lg border ${containerBorder} ${containerBg} ${inputText} transition-colors`}>
          <strong>Result ({output.type}):</strong> {String(result)}
          {output.description && <p className="mt-1 text-sm text-gray-400">{output.description}</p>}
        </div>
      )}
    </div>
  );
}