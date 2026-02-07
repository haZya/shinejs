"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function DynamicUpdateLightPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 36, g: 61, b: 91 }, blur: 36, opacity: 0.2 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { intensity: 2, position: { x: 320, y: 140 } } })}
          >
            Update Light
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Live Updates</h2>
      </div>
    </PreviewFrame>
  );
}
