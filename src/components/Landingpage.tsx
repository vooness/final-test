"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Words to cycle through
  const words = ["HR procesy", "Sales", "Copywriting", "Tvorbu"];

  // Cycle through words with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 1000); // Matches animation duration (1s)
    }, 2200); // Change word every 4 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative h-screen text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background Video for Desktop */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        src="/imgs/bg.mp4"
        autoPlay
        loop
        muted
        playsInline // Ensures inline playback on iOS
      >
        {/* Fallback Sources */}
        <source src="/imgs/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Image for Mobile */}
      <img
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        src="/imgs/bg-jpg.jpg" // Replace with your mobile background image path
        alt="Background Image"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 space-y-6 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight flex flex-col items-center">
          {/* 1st line */}
          <span className="mb-2">Zlepšete</span>

          {/* 2nd line (blue text) */}
          <span
            className={`text-blue-500 transition-opacity duration-1000 ease-in-out inline-block min-h-[2.5rem]`}
          >
            <span
              className={`block ${
                animate ? "opacity-0" : "opacity-100"
              } transition-opacity duration-1000 ease-in-out`}
            >
              {words[currentWordIndex]}
            </span>
          </span>

          {/* 3rd line (depending on screen width) */}
          <span className="hidden md:inline whitespace-nowrap mt-2">
            s umělou inteligencí
          </span>
          <span className="block md:hidden mt-2">s AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg opacity-100 max-w-3xxl mx-auto text-blue-400">
          Místo 3 hodin to zvádla za 45 minut!
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <a
            href="#contact"
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg transform hover:scale-105"
          >
            Získat náskok s AI  
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
