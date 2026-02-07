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
      opacity: 0.3,
      offset: 0.08,
    },
  });

  return (
    <PreviewFrame>
      <h2 ref={ref} className="m-0! text-center text-8xl font-black text-slate-200">
        Shine Mouse Follow
      </h2>
    </PreviewFrame>
  );
}
