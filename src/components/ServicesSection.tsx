// components/ServicesSection.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Definice služeb
const services = [
  {
    title: "Naučím vás, jak mluvit s AI",
    description:
      "Ukážu vám, jak efektivně používat nástroje jako ChatGPT. Naučíte se pokládat správné otázky, aby vám AI opravdu pomohla řešit problémy nebo vytvářet nápady.",
  },
  {
    title: "Automatizace rutinních úkolů",
    description:
      "Pomůžu vám zapojit AI tam, kde vám ušetří čas – odpovědi na e-maily, příprava textů, nebo třeba analýza dat. Jednoduše ukážu, jak si zjednodušit každodenní agendu.",
  },
  {
    title: "AI v HR procesech",
    description:
      "Pomáhám startupům a malým firmám s náborem a HR procesy. Ať už jde o tvorbu popisu pozic, předvýběr kandidátů, nebo nastavení automatizovaných odpovědí.",
  },
  {
    title: "LinkedIn strategie s AI",
    description:
      "Ukážu vám, jak využít AI pro tvorbu příspěvků, zpracování dat o zákaznících nebo personalizaci zpráv. Díky tomu můžete efektivněji oslovovat klienty a budovat vztahy.",
  },
  {
    title: "Kreativní práce s AI nástroji",
    description:
      "Ať už jde o tvorbu obsahu na sociální sítě, vizuály v Canvě, nebo videa – pomůžu vám najít ty správné nástroje a naučím vás s nimi pracovat.",
  },
  {
    title: "Školení pro týmy",
    description:
      "V jednoduchých, srozumitelných krocích naučím váš tým, jak si najít cestu k AI. Ukážu, kde začít, co se dá automatizovat, a jak AI zapojit do každodenní práce.",
  },
  {
    title: "Praktická řešení na míru",
    description:
      "Nerozumíte AI a nevíte, kde začít? Projdeme spolu vaše procesy a najdeme místa, kde AI může mít největší přínos. Vytvořím pro vás konkrétní plán.",
  },
  {
    title: "Žádný stres – krok za krokem",
    description:
      "AI může být na první pohled složitá, ale ukážu vám, že to tak není. Pomůžu vám seznámit se s nástroji v klidu a tempem, které vám vyhovuje.",
  },
  {
    title: "Inspirace pro vás i váš tým",
    description:
      "Během konzultací vám ukážu konkrétní příklady, kde AI opravdu funguje. Ať už jde o zrychlení práce, nebo uvolnění rukou pro kreativitu.",
  },
  {
    title: "Osobní podpora a spolupráce",
    description:
      "Nebudu vás jen učit – budu tu s vámi. Pomůžu vám AI opravdu začlenit do každodenní práce, budu po ruce při implementaci a nastavování procesů.",
  },
];

const ServicesSection: React.FC = () => {
  // Stav pro sledování, které služby jsou otevřené
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  // Funkce pro toggle otevření/sbavení služby
  const toggleService = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Refs a Three.js setup
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !bgRef.current) return;

    // Inicializace Three.js scény
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

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x3b82f6, // Modrá barva
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animace
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
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
    <section className="relative bg-gray-900 text-white py-16 px-6 overflow-hidden">
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

      <div className="container mx-auto relative z-10">
        {/* Úvodní část */}
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
            Pomáhám lidem i firmám najít cestu k AI
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Pomáhám lidem i firmám najít cestu k AI – jednoduše, srozumitelně a
            prakticky. Nejsem technik, ale ukážu vám, jak AI využít tak, aby
            vám usnadnila práci, ušetřila čas a přinesla výsledky. Co
            konkrétně nabízím?
          </p>
        </div>

        {/* Služby */}
        <div className="w-full max-w-3xl mx-auto">
          {services.map((service, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleService(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-left text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center">
                    {/* Modrá kulatá ikonka s číslem */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
                      {index + 1}
                    </div>
                    <span>{service.title}</span>
                  </div>
                  {/* Indikátor rozbalení */}
                  <span className="text-xl font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-2 px-4 py-3 text-gray-300 bg-gray-700 rounded-lg">
                    {service.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
