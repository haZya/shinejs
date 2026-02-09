"use client";

import { useShine } from "@hazya/shinejs/react";
import { useRef } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function LightPositionFixedPointPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  useShine(ref, {
    light: {
      intensity: 1.2,
      position: { x: 480, y: 220 },
    },
    config: {
      blur: 36,
      offset: 0.08,
      opacity: 0.3,
      shadowRGB: { r: 24, g: 41, b: 71 },
    },
  });

  return (
    <PreviewFrame>
      <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
        Fixed Point
      </h2>
    </PreviewFrame>
  );
}
