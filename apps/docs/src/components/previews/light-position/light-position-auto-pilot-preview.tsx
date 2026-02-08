"use client";

import { useEffect, useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function LightPositionAutoPilotPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const frame = useRef<number | null>(null);
  const { update } = useShine(ref, {
    light: { intensity: 1.2 },
    config: {
      blur: 36,
      offset: 0.08,
      opacity: 0.3,
      shadowRGB: { r: 24, g: 41, b: 71 },
    },
  });

  useEffect(() => {
    const animate = () => {
      const t = Date.now() * 0.00025 * Math.PI * 2;
      const x = window.innerWidth * 0.5 + window.innerWidth * 0.4 * Math.cos(t);
      const y = window.innerHeight * 0.5 + window.innerHeight * 0.4 * Math.sin(t * 0.7);
      update({ light: { position: { x, y } } });
      frame.current = window.requestAnimationFrame(animate);
    };

    frame.current = window.requestAnimationFrame(animate);
    return () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [update]);

  return (
    <PreviewFrame>
      <h2 ref={ref} className="m-0! text-center text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-200">
        Auto Pilot
      </h2>
    </PreviewFrame>
  );
}
