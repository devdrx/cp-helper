// src/pages/Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../App";
import { SunIcon, MoonIcon, ArrowRightIcon } from "@heroicons/react/outline";

export default function Home() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`}>      
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            CP Tool: Your Competitive Programming Companion
          </h1>
          <p className="text-lg lg:text-xl">
            Build graphs, crunch numbers, and master algorithms—all in one place. 
            Switch seamlessly between light and dark mode.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/calculator"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Get Started <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          {/* Placeholder hero image or illustration */}
          <img
            src="/hero-illustration.svg"
            alt="Competitive programming tools"
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 space-y-12">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/calculator" className="feature-card">
            <div className="icon-placeholder bg-blue-100 dark:bg-blue-900">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold mt-4">Calculator</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Number theory, combinatorics, binary ops—instantly compute core CP routines.
            </p>
          </Link>

          <Link to="/graph-editor" className="feature-card">
            <div className="icon-placeholder bg-green-100 dark:bg-green-900">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold mt-4">Graph Editor</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Visualize directed and undirected graphs with ease using D3.js.
            </p>
          </Link>

          <Link to="/documentation" className="feature-card">
            <div className="icon-placeholder bg-purple-100 dark:bg-purple-900">
              {/* icon */}
            </div>
            <h3 className="text-xl font-semibold mt-4">Documentation</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Learn algorithms, data structures, and get quick reference guides.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
