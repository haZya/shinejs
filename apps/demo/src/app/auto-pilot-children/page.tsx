"use client";

import { useShine } from "@hazya/shinejs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";
import img1 from "./img-1.jpg";
import img2 from "./img-2.jpg";
import img3 from "./img-3.jpg";

function AutoPilotChildrenDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLDivElement>(null);
  const { shine, update } = useShine(headlineRef, {
    light: { intensity: isDarkMode ? 1 : 3 },
    config: {
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
    },
  });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (shine) {
      const animate = () => {
        const time = new Date().getTime();
        const speed = 0.00025;
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
      <Link href="/" className="absolute top-16 left-16 z-10 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <h2 className="title my-16 text-center text-4xl font-bold text-pretty dark:invert">Auto-Pilot Demo (Children - Box Shadow)</h2>
      <div id="headline" ref={headlineRef} className="grid place-items-center gap-6 md:grid-cols-3">
        <Image src={img1} alt="Placeholder 1" />
        <Image src={img2} alt="Placeholder 2" />
        <Image src={img3} alt="Placeholder 3" />
      </div>
    </div>
  );
}

export default AutoPilotChildrenDemo;
