"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function LightPositionFollowMousePreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  useShine(ref, {
    light: {
      intensity: 1.2,
      position: "followMouse",
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
      <h2 ref={ref} className="m-0! text-center text-8xl font-black text-slate-200">
        Follow Mouse
      </h2>
    </PreviewFrame>
  );
}
