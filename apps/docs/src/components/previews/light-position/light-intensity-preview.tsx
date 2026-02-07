"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function LightIntensityPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse", intensity: 1 },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 34 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { intensity: 1.5 } })}
          >
            Intensity 1.5
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Light Control</h2>
      </div>
    </PreviewFrame>
  );
}
