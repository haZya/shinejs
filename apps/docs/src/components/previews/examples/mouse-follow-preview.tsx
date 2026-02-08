"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function MouseFollowPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  useShine(ref, {
    light: {
      intensity: 1.2,
      position: "followMouse",
    },
    config: {
      blur: 36,
      opacity: 0.3,
      offset: 0.08,
      shadowRGB: { r: 24, g: 41, b: 71 },
    },
  });

  return (
    <PreviewFrame>
      <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
        Shine Mouse Follow
      </h2>
    </PreviewFrame>
  );
}
