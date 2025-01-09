"use client";

import React, { useEffect, useRef } from "react";

export default function CoolAICursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Move the cursor to the mouse coordinates
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // Hide the default cursor
    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Show the normal cursor again
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="ai-cursor" ref={cursorRef}></div>;
}
