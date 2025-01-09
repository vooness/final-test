"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as THREE from "three";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const tasks = [
  {
    name: "E-mailové shrnutí",
    hoursBefore: 2,
    improvementFactor: 0.5,
    popis: "Automatizované shrnutí e-mailů pomocí AI.",
  },
  {
    name: "Chatbot pro podporu",
    hoursBefore: 5,
    improvementFactor: 0.6,
    popis: "AI chatbot pro zodpovídání dotazů zákazníků 24/7.",
  },
  {
    name: "Tvorba obsahu (blogy, marketing)",
    hoursBefore: 6,
    improvementFactor: 0.5,
    popis: "Generování textů pro marketingové kampaně či články.",
  },
  {
    name: "Analýza dat a reporting",
    hoursBefore: 4,
    improvementFactor: 0.4,
    popis: "Automatické vyhodnocení dat a tvorba přehledů.",
  },
  {
    name: "Zpracování dokumentů",
    hoursBefore: 3,
    improvementFactor: 0.5,
    popis: "Shrnutí dlouhých PDF, vyhledávání klíčových informací.",
  },
  {
    name: "HR: Třídění životopisů",
    hoursBefore: 4,
    improvementFactor: 0.5,
    popis: "Automatizovaná selekce uchazečů podle klíčových slov.",
  },
  {
    name: "HR: Návrh pohovorových otázek",
    hoursBefore: 2,
    improvementFactor: 0.4,
    popis: "Generování otázek pro různé pracovní pozice.",
  },
  {
    name: "Přepisy / Shrnutí meetingů",
    hoursBefore: 3,
    improvementFactor: 0.5,
    popis: "Automatické zápisy z porad a analýza úkolů.",
  },
  {
    name: "Kontrola kvality textů",
    hoursBefore: 2,
    improvementFactor: 0.5,
    popis: "Gramatické a stylistické revize textů pomocí AI.",
  },
  {
    name: "Rychlý průzkum / rešerše",
    hoursBefore: 3,
    improvementFactor: 0.5,
    popis: "Vyhledávání informací a trendů z webu či interních zdrojů.",
  },
];

export default function CalculatorAI() {
  const [employees, setEmployees] = useState<number>(15);

  const bgRef = useRef<HTMLDivElement | null>(null);

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
    renderer.setPixelRatio(1);
    bgRef.current.appendChild(renderer.domElement);

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
      particlesMesh.rotation.y += 0.0008;
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

  // Calculate total hours before/after AI for each task
  const totalBeforeArray = tasks.map((task) => task.hoursBefore * employees);
  const totalAfterArray = tasks.map(
    (task) => task.hoursBefore * task.improvementFactor * employees
  );

  const sumBefore = totalBeforeArray.reduce((acc, val) => acc + val, 0);
  const sumAfter = totalAfterArray.reduce((acc, val) => acc + val, 0);

  const data = {
    labels: tasks.map((t) => t.name),
    datasets: [
      {
        label: "Před AI",
        data: totalBeforeArray,
        backgroundColor: "#3B82F6",
      },
      {
        label: "Po AI",
        data: totalAfterArray,
        backgroundColor: "#7DD3FC",
      },
    ],
  };

  // Removed the animation block entirely
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 1,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: { size: 12 },
        },
        grid: { color: "#4B5563" },
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: { size: 12 },
        },
        grid: { color: "#4B5563" },
      },
    },
  };

  const incrementEmployees = () =>
    setEmployees((prev) => Math.min(prev + 1, 999));
  const decrementEmployees = () =>
    setEmployees((prev) => Math.max(prev - 1, 1));

  return (
    <section className="relative w-full bg-gray-900 py-10 overflow-hidden">
      {/* Three.js Particles Background */}
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

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <h2 className="text-4xl lg:text-6xl font-bold text-center text-white mb-12 mt-12">
          Kalkulačka úspor s AI
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3 mb-10">
          <label className="text-lg font-semibold text-white whitespace-nowrap">
            Počet zaměstnanců:
          </label>
          <div className="flex flex-row gap-2 items-center">
            <button
              type="button"
              onClick={decrementEmployees}
              className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              -
            </button>
            <input
              type="number"
              className="w-20 text-center bg-gray-800 border border-gray-600 rounded py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={1}
              max={999}
              value={employees}
              onChange={(e) => {
                const val = parseInt(e.target.value || "1", 10);
                setEmployees(isNaN(val) ? 1 : Math.max(1, Math.min(val, 999)));
              }}
            />
            <button
              type="button"
              onClick={incrementEmployees}
              className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            Nastavte počet a tabulka se aktualizuje
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl mb-2">
            <strong>Před AI (celkem):</strong> {sumBefore.toFixed(0)} hodin/týden
          </p>
          <p className="text-xl mb-2">
            <strong>Po AI (celkem):</strong> {sumAfter.toFixed(0)} hodin/týden
          </p>
          <p className="text-xl mt-4 text-green-400 font-bold">
            Úspora času: {(sumBefore - sumAfter).toFixed(0)} hodin týdně
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] my-12">
          <Bar data={data} options={options} redraw />
        </div>

        <p className="text-xs text-gray-400 text-center">
          *Tato kalkulačka je pouze teoretická. Skutečné úspory závisí na
          konkrétních podmínkách vaší firmy a na typu nasazené AI.
        </p>
      </div>
    </section>
  );
}
