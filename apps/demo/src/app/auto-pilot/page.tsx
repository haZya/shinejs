"use client";

import { useShine } from "@hazya/shinejs/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function AutoPilotDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { shine, update } = useShine(headlineRef, {
    config: {
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
    },
  });
  const animationFrameId = useRef<number>(null);

  useEffect(() => {
    if (shine && update) {
      const animate = () => {
        const time = new Date().getTime();
        const speed = 0.00025; // 1 = 1000 rotations/s
        const phase = time * speed * 2.0 * Math.PI;
        const radiusX = window.innerWidth * 0.5;
        const radiusY = window.innerHeight * 0.5;

        const newX = radiusX + radiusX * Math.cos(phase);
        const newY = radiusY + radiusY * Math.sin(phase * 0.7);

        update({ light: { position: { x: newX, y: newY } } });

        animationFrameId.current = window.requestAnimationFrame(animate);
      };

      animationFrameId.current = window.requestAnimationFrame(animate);

      return () => {
        if (animationFrameId.current) {
          window.cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [shine, update]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-16">
      <Link href="/" className="absolute top-16 left-16 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <h1 id="headline" ref={headlineRef} className="mt-16 text-center text-7xl font-extrabold uppercase sm:text-9xl">
        Shine Auto-Pilot Demo
      </h1>
    </div>
  );
}

export default AutoPilotDemo;
