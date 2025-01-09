"use client";

import React from "react";

// Direct imports of components
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/Landingpage";
import AboutMe from "@/components/Aboutme";
import ServicesSection from "@/components/ServicesSection";
import Aibussines from "@/components/Aibussines";
import ToolsSection from "@/components/ToolSection";
import AiToolsGrid from "@/components/AiToolsGrid";
import BlogSection from "@/components/BlogSection";
import AiProcessTimeline from "@/components/AiProcessTimeline";
import Calculator from "@/components/calculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Page: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      {/* One Page Structure Sections */}
      <div id="landing" className="snap-start">
        <LandingPage />
      </div>

      {/* Calculator immediately under Landing Page */}
      <div id="calculator" className="snap-start">
        <Calculator />
      </div>

      <div id="about-me" className="snap-start">
        <AboutMe />
      </div>

      <div id="services" className="snap-start">
        <ServicesSection />
      </div>

      <div id="aibussines" className="snap-start">
        <Aibussines />
      </div>

      <div id="timeline" className="snap-start">
        <AiProcessTimeline />
      </div>

      <div id="contact" className="snap-start">
        <Contact />
      </div>

      <div id="tools" className="snap-start">
        <ToolsSection />
        <AiToolsGrid />
      </div>

      <div id="blog" className="snap-start">
        <BlogSection />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
