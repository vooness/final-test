"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  FaLightbulb,
  FaChartLine,
  FaTools,
  FaRocket,
} from "react-icons/fa";
import "react-vertical-timeline-component/style.min.css";
import * as THREE from "three";

/** 
 * Memoized steps array to prevent re-renders 
 * when the component updates state for the intersection observer, etc.
 */
const useSteps = () =>
  useMemo(
    () => [
      {
        title: "Zavoláme si",
        description:
          "Spojíme se, seznámíme se a pobavíme se o tom, jak to u vás funguje.",
        icon: <FaLightbulb />,
      },
      {
        title: "Analýza v akci",
        description:
          "Seznamuji se s každodenními úkoly těch, kteří AI zavádějí, a hledám, kde jim může ušetřit čas nebo energii. Ptám se, co je pro ně největší výzvou, a společně nastavujeme první kroky.",
        icon: <FaChartLine />,
      },
      {
        title: "Teď je to na mně",
        description:
          "Na základě stínování vytvářím konkrétní postup, jak AI začlenit. Např. Copy.ai jako pomocník pro copywriterku Jarmilku, který jí ulehčí rutinní psaní, ušetří čas a umožní jí soustředit se na kreativní část práce.",
        icon: <FaTools />,
      },
      {
        title: "Implementace",
        description:
          "Na pravidelných setkáních probíráme, jak využívat AI pro konkrétní zadání z praxe. Jsem po ruce a pomáhám tam, kde je to třeba. Např. Jarmilce, která začala využívat Copy.ai pro vytváření obsahu.",
        icon: <FaRocket />,
      },
      {
        title: "Monitoring a optimalizace",
        description:
          "Hodnotíme, zda AI přináší užitek a společně se díváme na výsledky. Např. Jarmilka, zda je efektivnější s Copy.ai. Pokud ne, společně upravujeme strategii.",
        icon: <FaChartLine />,
      },
    ],
    []
  );

const AiProcessTimeline: React.FC = () => {
  const steps = useSteps();

  const [isGlowing, setIsGlowing] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // === Three.js references ===
  const bgRef = useRef<HTMLDivElement | null>(null);

  /**
   * Intersection Observer for the video glow effect
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGlowing(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  /**
   * Set up Three.js particles background
   */
  useEffect(() => {
    if (!bgRef.current || typeof window === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      bgRef.current.clientWidth / bgRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    bgRef.current.appendChild(renderer.domElement);

    // Performance: reduce the particle count from 500 -> 300
    const particlesCount = 300;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Slightly adjusting size and opacity for performance
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
      // Subtle rotation for the starfield
      particlesMesh.rotation.y += 0.0007;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!bgRef.current) return;
      camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
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
    <section
      id="consulting"
      className="relative bg-gray-900 text-white py-16 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* === Three.js Particle Background === */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      {/* === Main Content === */}
      <div className="relative z-10 container mx-auto">
        <h2 className="text-5xl font-bold text-center text-white mb-20 mt-12">
          Jak budeme postupovat?
        </h2>

        {/* Central Video w/ Neon Glow */}
        <div
          ref={videoRef}
          className={`relative z-20 mb-16 max-w-[800px] w-full mx-auto overflow-hidden rounded-lg shadow-lg transition-shadow ${
            isGlowing ? "neon-glow" : ""
          }`}
        >
          <video
            className="w-full h-auto object-cover"
            src="/imgs/chip.mp4"
            autoPlay
            loop
            muted
            playsInline
            // Tip: If you want lazy loading for performance, uncomment next line
            // preload="none"
          />
        </div>

        {/* Vertical Timeline */}
        <VerticalTimeline lineColor="#3b82f6" className="relative z-40">
          {steps.map((step, index) => (
            <VerticalTimelineElement
              key={index}
              iconStyle={{ background: "#3b82f6", color: "#fff" }}
              icon={step.icon}
              contentStyle={{
                background: "linear-gradient(to bottom, #1f2937, #111827)",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                padding: "20px",
              }}
              contentArrowStyle={{ borderRight: "7px solid #1f2937" }}
            >
              <span className="block text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">
                Krok {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {/* === Custom CSS for neon glow === */}
      <style jsx>{`
        .neon-glow {
          box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6;
        }
      `}</style>
    </section>
  );
};

export default AiProcessTimeline;
