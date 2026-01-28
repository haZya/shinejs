"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Point, useShine } from "shinejs-react";

import img1 from "./img-1.jpg";
import img2 from "./img-2.jpg";
import img3 from "./img-3.jpg";

function AutoPilotChildrenDemo() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { shine, update } = useShine(headlineRef, { light: { intensity: 5 } });
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

        update({ light: { position: new Point(newX, newY) } });

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
    <div id="headline" ref={headlineRef} className="min-h-screen grid md:grid-cols-3 place-items-center gap-6 p-16">
      <Image src={img1} alt="Placeholder 1" />
      <Image src={img2} alt="Placeholder 2" />
      <Image src={img3} alt="Placeholder 3" />
    </div>
  );
}

export default AutoPilotChildrenDemo;
