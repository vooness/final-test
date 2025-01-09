"use client";

import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import * as THREE from "three";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reference to the Three.js background container in mobile menu
  const menuBgRef = useRef<HTMLDivElement | null>(null);

  // Disable scrolling on the body when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  /**
   * Initialize the Three.js scene for the mobile menu
   * whenever 'isMobileMenuOpen' becomes true, and tear it down on close.
   */
  useEffect(() => {
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let particlesMesh: THREE.Points | null = null;

    if (isMobileMenuOpen && menuBgRef.current) {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        menuBgRef.current.clientWidth / menuBgRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(
        menuBgRef.current.clientWidth,
        menuBgRef.current.clientHeight
      );
      renderer.setPixelRatio(1); // keep text sharp
      menuBgRef.current.appendChild(renderer.domElement);

      // Create simple particles
      const particlesCount = 200; // keep it modest
      const particlesGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
      });

      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Animation loop
      const animate = () => {
        if (!renderer || !scene || !camera) return;
        requestAnimationFrame(animate);
        if (particlesMesh) particlesMesh.rotation.y += 0.0008;
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        if (!menuBgRef.current || !camera || !renderer) return;
        camera.aspect =
          menuBgRef.current.clientWidth / menuBgRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          menuBgRef.current.clientWidth,
          menuBgRef.current.clientHeight
        );
      };
      window.addEventListener("resize", handleResize);

      // Cleanup when the menu closes
      return () => {
        window.removeEventListener("resize", handleResize);
        if (renderer) {
          renderer.dispose();
        }
        if (menuBgRef.current) {
          menuBgRef.current.innerHTML = "";
        }
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold">
          <Link href="/" className="hover:text-blue-400 transition-all">
            AI Andrt
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-8">
          <Link href="/#landing" className="relative group text-sm font-medium text-white">
            Domů
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#calculator" className="relative group text-sm font-medium text-white">
            Kalkulačka
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#about-me" className="relative group text-sm font-medium text-white">
            O mně
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#aibussines" className="relative group text-sm font-medium text-white">
            Proč AI
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#timeline" className="relative group text-sm font-medium text-white">
            Spolupráce
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          
          <Link href="/#tools" className="relative group text-sm font-medium text-white">
            AI nástroje
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#blog" className="relative group text-sm font-medium text-white">
            Blog
            <span className="block h-0.5 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop contact button */}
        <div className="hidden lg:block">
          <Link
            href="/#contact"
            className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Konzultace
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose className="h-8 w-8 text-blue-400" />
          ) : (
            <AiOutlineMenu className="h-8 w-8 text-blue-400" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 text-white flex flex-col transform transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{ backgroundColor: "#111827" }} // your dark BG
      >
        {/* === Three.js container for the menu background === */}
        <div
          ref={menuBgRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            // you can optionally apply a mask/gradient if you want
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        {/* The content of the mobile menu */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full">
          {/* Top: "Close" button + logo */}
          <div className="w-full flex justify-between items-center px-4 py-4">
            <div className="text-lg font-extrabold">AI Andrt</div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-blue-400 focus:outline-none"
            >
              <AiOutlineClose className="h-8 w-8" />
            </button>
          </div>

          {/* Middle: Mobile nav links */}
          <div className="flex flex-col items-center space-y-6">
            <Link
              href="/#landing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              Domů
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              Kalkulačka
            </Link>
            <Link
              href="/#about-me"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              O mně
            </Link>
            <Link
              href="/#aibussines"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              Proč AI
            </Link>
            <Link
              href="/#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              Spolupráce
            </Link>
            
            <Link
              href="/#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              AI nástroje
            </Link>
            <Link
              href="/#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white"
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-blue-400"
            >
              Kontakt
            </Link>
          </div>

          {/* Bottom: CTA / contact info */}
          <div className="w-full bg-gray-700 py-6 px-4 text-center">
            <p className="text-sm text-gray-300">Máte dotazy? Kontaktujte mě:</p>
            <a
              href="mailto:ai.andrt.martin@gmail.com"
              className="block mt-2 text-lg text-blue-400 underline hover:text-blue-500"
            >
              ai.andrt.martin@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
