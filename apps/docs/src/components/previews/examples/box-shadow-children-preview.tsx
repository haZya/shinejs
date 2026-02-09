"use client";

import { useShine } from "@hazya/shinejs/react";
import { useRef } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function BoxShadowChildrenPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useShine(ref, {
    light: {
      intensity: 1.2,
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
      <div ref={ref} className="grid w-full max-w-xl grid-cols-2 gap-6">
        <div className="h-24 rounded-lg bg-slate-200" />
        <div className="h-24 rounded-lg bg-slate-200" />
      </div>
    </PreviewFrame>
  );
}
