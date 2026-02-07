"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function MouseFollowPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 } },
  });

  return (
    <PreviewFrame>
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Shine Mouse Follow</h2>
    </PreviewFrame>
  );
}
