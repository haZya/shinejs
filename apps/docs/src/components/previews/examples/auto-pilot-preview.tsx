"use client";

import { useEffect, useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function AutoPilotPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const frame = useRef<number | null>(null);
  const { update } = useShine(ref, {
    config: { blur: 38, shadowRGB: { r: 0, g: 0, b: 0 } },
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
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [update]);

  return (
    <PreviewFrame>
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Auto Pilot</h2>
    </PreviewFrame>
  );
}
