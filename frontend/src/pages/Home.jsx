// src/pages/Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../App";
import { SunIcon, MoonIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Home() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`}>      
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-x-36">
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
              {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
        <div className="lg:w-1/3 mt-10 lg:mt-0 border-2 rounded-xl">
        <Swiper
           modules={[Autoplay]}
           autoplay={{
             delay: 2500,
             disableOnInteraction: false,
           }}
          spaceBetween={30}
          loop={true}
          className="w-full h-full rounded-xl shadow-xl"
        >
          <SwiperSlide>
            <img src="/assets/login.png" alt="Slide 1" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/profile1.png" alt="Slide 2" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/profile2.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/profile3.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/profile4.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/profile5.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/allblogs.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/blog1.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/bolg2.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/graph2.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/calci.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/docs1.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/graph1.png" alt="Slide 3" className="rounded-xl w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6  space-y-6">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/calculator" className="border-2 p-2">
          <div className="icon-placeholder">
            <img src="/assets/calculator.png" alt="Calculator Icon" className="w-40 h-40 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mt-4">Calculator</h3>
          <p className="mt-2 text-gray-900 dark:text-gray-400">
            Number theory, combinatorics, binary ops—instantly compute core CP routines.
          </p>
        </Link>


          <Link to="/graph-editor" className="border-2 p-2">
            <div className="icon-placeholder">
              <img src="/assets/graph.png" alt="Graph Icon" className="w-40 h-40 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Graph Editor</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Visualize directed and undirected graphs with ease using D3.js.
            </p>
          </Link> 

          <Link to="/documentation" className="border-2 p-2">
            <div className="icon-placeholder">
              <img src="/assets/docs.png" alt="Documentation Icon" className="w-40 h-40 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Documentation</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Learn algorithms, data structures, and get quick reference guides.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
