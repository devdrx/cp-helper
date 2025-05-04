// src/components/CalculatorRenderer.jsx
// src/components/CalculatorRenderer.jsx
import React, { useState, useEffect, useContext } from "react";
import calcDefs from "../assets/calculators.json";
import * as logic from "../utils/calcLogic";
import { DarkModeContext } from "../App";

export default function CalculatorRenderer({ categoryKey }) {
  const { darkMode } = useContext(DarkModeContext);

  // Fetch definitions safely
  const defs = calcDefs.calculators?.[categoryKey] || {};
  const entries = Object.entries(defs);
  const [fnKey, fnDef] = entries[0] || [null, null];
  const inputs = fnDef?.inputs || [];
  const output = fnDef?.output;
  const description = fnDef?.description || "";
  const logicFn = fnDef?.logicFn;
  const fn = logic[logicFn] || (() => null);

  // Form state (hooks at top level)
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  // Initialize form values and reset result when fnKey or categoryKey changes
  useEffect(() => {
    const initValues = inputs.reduce((acc, i) => ({ ...acc, [i.name]: "" }), {});
    setValues(initValues);
    setResult(null);
  }, [categoryKey, fnKey, inputs]);


  // If no valid function definition, show fallback
  if (!fnKey || !fnDef) {
    return <p className="text-red-500">No calculator for “{categoryKey}”</p>;
  }

  // Input styling classes
  const inputBg = darkMode ? "bg-gray-700" : "bg-gray-100";
  const inputText = darkMode ? "text-white" : "text-gray-900";
  const inputBorder = darkMode ? "border-gray-600" : "border-gray-300";
  const placeholder = darkMode ? "placeholder-gray-400" : "placeholder-gray-500";

  const handleChange = (name, val) => {
    setValues(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const args = inputs.map(i => (i.type === "number" ? Number(values[i.name]) : values[i.name]));
      const res = fn(...args);
      setResult(res);
    } catch (err) {
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{description}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputs.map(i => (
          <div key={i.name} className="space-y-1">
            <label htmlFor={i.name} className="block font-medium">
              {i.name}
            </label>
            <input
              id={i.name}
              type={i.type}
              value={values[i.name]}
              onChange={e => handleChange(i.name, e.target.value)}
              placeholder={i.description}
              required
              className={`w-full px-3 py-2 rounded-lg border ${inputBorder} ${inputBg} ${inputText} ${placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 w-full py-2 font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Compute
        </button>
      </form>

      {result !== null && (
        <div className={`p-4 rounded-lg border ${inputBorder} ${inputBg} ${inputText} transition-colors`}>
          <strong>Result ({output?.type}):</strong> {String(result)}
          {output?.description && <p className="mt-1 text-sm text-gray-400">{output.description}</p>}
        </div>
      )}
    </div>
  );
}
