"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import * as THREE from "three";
import {
  FaRobot,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaLightbulb,
  FaToolbox,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { SiCanva, SiAdobe, SiFigma } from "react-icons/si";

// Statistika (Přesunuté dolů)
const stats = [
  { label: "Projekty", value: "30+" },
  { label: "Klienti", value: "20+" },
  { label: "Let zkušeností", value: "6+" },
  { label: "Koček", value: "4+" },
];

// Testimonialy
const testimonials = [
  {
    name: "David Smith",
    role: "CEO, TechCorp",
    feedback:
      "Martin dodal řešení přesně na míru našim potřebám. Jeho přístup a znalosti AI technologií nám umožnily zdvojnásobit efektivitu týmu.",
    date: "22. leden 2023",
    image: "/icons/78.jpg",
    rating: 5,
  },
  {
    name: "Eva Nováková",
    role: "HR Manager, CreativeCorp",
    feedback:
      "Martin nám ukázal, jak efektivně implementovat AI do našeho náborového procesu. Výsledky jsou viditelné již po měsíci.",
    date: "10. březen 2023",
    image: "/icons/86.jpg",
    rating: 4.5,
  },
  {
    name: "John Doe",
    role: "CTO, InnovationHub",
    feedback:
      "S Martinovou pomocí jsme dosáhli automatizace procesů, o které jsme dříve jen snili. Jeho přístup je profesionální a efektivní.",
    date: "15. únor 2023",
    image: "/icons/72.jpg",
    rating: 4,
  },
  {
    name: "Anna White",
    role: "Product Manager, TechSolutions",
    feedback:
      "Martin je nejen odborník na AI, ale také výborný stratég. Díky němu jsme zefektivnili náš produktový vývoj.",
    date: "5. duben 2023",
    image: "/icons/56.jpg",
    rating: 5,
  },
];

// Dovednosti
const skills = [
  { name: "Umělá inteligence", value: "90%", icon: <FaRobot /> },
  { name: "Sales strategie", value: "80%", icon: <FaRocket /> },
  { name: "HR procesy", value: "85%", icon: <FaUsers /> },
  { name: "Analýza dat", value: "80%", icon: <FaChartLine /> },
  { name: "Marketingová strategie", value: "85%", icon: <FaLightbulb /> },
  { name: "Nástroje a systémy", value: "70%", icon: <FaToolbox /> },
  { name: "Canva design", value: "85%", icon: <SiCanva /> },
  { name: "Adobe nástroje", value: "75%", icon: <SiAdobe /> },
];

// Workflow
const workflow = [
  "Cíle a strategie",
  "Analýza a výzkum",
  "Prototypování řešení",
  "Implementace AI nástrojů",
  "Monitoring a optimalizace",
];

// Funkce pro renderování hvězd
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-500" />);
    }
  }
  return <div className="flex space-x-1">{stars}</div>;
};

export default function AboutMeBento() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  // Přepínání testimonialů každé 4 sekundy
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Změna každé 4 sekundy

    return () => clearInterval(interval);
  }, []);

  // Inicializace Three.js
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
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

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

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (bgRef.current) {
        bgRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="relative bg-gray-900 text-white py-12 px-4 md:px-8 min-h-screen mt-8 mb-8 ">
      {/* Three.js Particle Background */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      ></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {/* Profil */}
        <div className="md:col-span-2 row-span-2 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl p-6 flex flex-col items-center shadow-lg">
          {/* Wrapper pro Profilovou Fotku a Efekty */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 mb-6">
            {/* Animated Effects Around Photo */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-full opacity-30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute top-0 left-0 w-full h-full border-4 border-dashed rounded-full"
              style={{
                borderColor: "rgba(59, 130, 246, 0.8)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            ></motion.div>

            {/* Profile Photo */}
            <div className="relative w-full h-full rounded-full overflow-hidden  shadow-md z-10">
              <img
                src="/imgs/profil.png"
                alt="Profilová fotka"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-5xl font-bold text-blue-400">Ing. Martin Andrt</h3>
          <p className="text-2xl text-gray-300 mb-6 mt-6">Konzultant a nadšenec do AI</p>
          <p className="text-base text-gray-400 text-center leading-relaxed">
            Konzultant a nadšenec do AI, který neustále zkoumá svět digitálních technologií a trendů.
            Co dělám jinak? Vím, jak AI zapadá do reálného provozu firmy – nehraju si na vizionáře,
            prostě hledám řešení. Jednám narovinu a lidsky – když něco nejde, řeknu to. Když to jde, ukážu
            jak.
            Od roku 2022 buduji HR oddělení v IT startupu Rascasone. Zároveň se podílím na budování
            strategie a směřování firmy v oblasti salesu, marketingu a HR. Usiluji o to, aby byl celý tým
            součástí rozhodování, a společná strategie dávala smysl všem.
          </p>
        </div>

        {/* Můj přístup k AI - nahrazený smysluplným obsahem bez hodnocení */}
        <div className="md:col-span-2 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl p-6 shadow-md">
          <h3 className="text-3xl font-bold text-blue-400 mb-6">Můj přístup k AI</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Můj přístup k umělé inteligenci je založen na praktickém využití pro optimalizaci procesů ve firmě.
            Nezaměřuji se pouze na teoretické koncepty, ale hledám reálná řešení, která mohou přinést konkrétní
            výsledky a zlepšit efektivitu vašeho podnikání. Spolupracuji s týmy na identifikaci klíčových oblastí,
            kde může AI přinést největší hodnotu, a implementuji nástroje, které jsou snadno použitelné a přizpůsobitelné
            vašim potřebám.
          </p>
        </div>

        {/* Workflow */}
        <div className="md:col-span-2 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl p-6 shadow-md">
          <h3 className="text-3xl font-bold text-blue-400 mb-6">Workflow</h3>
          <ul className="list-disc list-inside text-gray-200 text-lg space-y-2">
            {workflow.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Dovednosti */}
<div className="md:col-span-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-6 shadow-md">
  <h3 className="text-3xl font-bold text-blue-400 mb-6">Dovednosti</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {skills.map((skill, index) => (
      <div
        key={index}
        className="
          flex flex-col items-center   /* On mobile: stack icon above text, centered */
          md:flex-row md:items-start   /* On md and up: icon left, text right */
          space-y-2 md:space-y-0      /* Vertical gap on mobile, none on md */
          md:space-x-4                /* Horizontal gap on md */
          text-center md:text-left
        "
      >
        <div className="text-4xl text-blue-400">
          {skill.icon}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-200">{skill.name}</h4>
          <p className="text-base text-gray-500">{skill.value}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Nové Gridy se Statistikami (Dole) */}
        <div className="md:col-span-4 bg-gradient-to-r rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-6 text-center shadow-md transition-shadow"
                initial={{
                  rotateX: 0,
                  rotateY: 0,
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }}
                whileHover={{
                  rotateX: 10,
                  rotateY: -10,
                  boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.8)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-5xl font-bold text-white">{stat.value}</h3>
                <p className="text-lg text-gray-200 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
