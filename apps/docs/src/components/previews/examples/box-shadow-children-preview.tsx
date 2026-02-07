"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function BoxShadowChildrenPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useShine(ref, {
    config: {
      shadowRGB: { r: 0, g: 0, b: 0 },
      blur: 22,
      opacity: 0.2,
    },
  });

  return (
    <PreviewFrame>
      <div ref={ref} className="grid w-full max-w-xl grid-cols-3 gap-3">
        <div className="h-24 rounded-lg bg-linear-to-br from-cyan-100 to-cyan-300" />
        <div className="h-24 rounded-lg bg-linear-to-br from-rose-100 to-orange-300" />
        <div className="h-24 rounded-lg bg-linear-to-br from-emerald-100 to-teal-300" />
      </div>
    </PreviewFrame>
  );
}
