'use client';

import React, { useEffect, useRef } from 'react';
import { Color, useShine } from 'shinejs-react';
import usePrefersDarkMode from '../hooks/use-dark-mode';

const AutoPilotDemo: React.FC = () => {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { shine, update } = useShine(headlineRef, {
    followMouse: false,
    shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0),
   });
  const animationFrameId = useRef<number>(null);

  useEffect(() => {
    if (shine && update) {
      const animate = () => {
        const time = new Date().getTime();
        const speed = 0.00025;  // 1 = 1000 rotations/s
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
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <h1 id="headline" ref={headlineRef} className="text-9xl text-center font-extrabold uppercase text-[#E4EBF5] dark:text-[#0a0a0a]">
        Shine Auto-Pilot Demo
      </h1>
    </div>
  );
};

export default AutoPilotDemo;
