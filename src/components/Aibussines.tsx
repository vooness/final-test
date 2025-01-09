"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaRocket, FaUsers, FaRegLightbulb, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import * as THREE from "three";

const Aibussines: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // === Three.js references ===
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check for mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // === Three.js Particle Setup ===
  useEffect(() => {
    if (typeof window === "undefined" || !bgRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      bgRef.current.clientWidth / bgRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    bgRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
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

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (bgRef.current) {
        camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (bgRef.current) {
        bgRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      id="intelligence"
      className="relative bg-gray-900 text-white py-24 overflow-hidden"
    >
      {/* ====== Particle Background ====== */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      ></div>

      {/* ====== Additional Background Graphics (only if not mobile) ====== */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-700 via-gray-900 to-blue-900 opacity-50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-blue-500 via-gray-800 to-blue-800 opacity-40 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-blue-800 via-blue-600 to-transparent opacity-30 rounded-full blur-3xl"></div>
        </motion.div>
      )}

      {/* ====== Main Content ====== */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Nadpis */}
        {isMobile ? (
          <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white mb-12">
            Proč se seznámit s AI?
          </h2>
        ) : (
          <motion.h2
            className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Proč se seznámit s AI?
          </motion.h2>
        )}

        {/* Popis */}
        {isMobile ? (
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            AI za nás všechnu práci neudělá, ale může být skvělým pomocníkem, když jí dáme šanci.
            Nemusí to být hned na profi úrovni – stačí se s ní jen trochu skamarádit.
          </p>
        ) : (
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            AI za nás všechnu práci neudělá, ale může být skvělým pomocníkem, když jí dáme šanci.
            Nemusí to být hned na profi úrovni – stačí se s ní jen trochu skamarádit.
          </motion.p>
        )}

        {/* Video Box */}
        {isMobile ? (
          <div className="relative overflow-hidden rounded-lg shadow-lg mb-16 max-w-[1000px] w-full mx-auto">
            <video
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/imgs/1920x1080_FULL_HD.mp4" type="video/mp4" />
              Váš prohlížeč nepodporuje přehrávání videí.
            </video>
          </div>
        ) : (
          <motion.div
            className="relative overflow-hidden rounded-lg shadow-lg mb-16 max-w-[1000px] w-full mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <video
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/imgs/1920x1080_FULL_HD.mp4" type="video/mp4" />
              Váš prohlížeč nepodporuje přehrávání videí.
            </video>
          </motion.div>
        )}

        {/* Oddělovací čára */}
        {isMobile ? (
          <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-300 w-24 mx-auto mb-12"></div>
        ) : (
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-300 w-24 mx-auto mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        )}

        {/* Grid s kartami */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delayChildren: 0.5, staggerChildren: 0.3 }}
        >
          {[
            {
              icon: <FaRocket className="text-blue-500 text-6xl" />,
              title: "Rychlejší progress!",
              description:
                "AI zvládne splnit nudné úkoly, co berou spoustu času. My se díky tomu můžeme soustředit na kreativní činnosti.",
            },
            {
              icon: <FaUsers className="text-blue-500 text-6xl" />,
              title: "„Must have“",
              description:
                "AI se velmi pravděpodobně brzy stane ‚must have‘ dovedností. Čím déle čekáme na seznámení s AI, tím těžší to bude.",
            },
            {
              icon: <FaRegLightbulb className="text-blue-500 text-6xl" />,
              title: "Inovace a strategie",
              description:
                "AI neřekne, co přesně dělat. Ale může nám ukázat, kde jsou možnosti, které nemusely být zřejmé.",
            },
            {
              icon: <FaMoneyBillWave className="text-blue-500 text-6xl" />,
              title: "Časová úspora",
              description: "„Místo 3 hodin to zvládla za 45 minut.“",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center md:items-start md:flex-row text-left bg-gray-800 p-6 rounded-lg transition-colors"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              {/* Ikona */}
              <div className="mb-4 md:mb-0 md:mr-6">{item.icon}</div>
              {/* Text */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Aibussines;
