"use client";

import { useMemo, useRef, useState } from "react";
import { useShine } from "shinejs/react";

import type { Rgb } from "@/components/previews/shared/color-utils";

import { hexToRgb, rgbToHex } from "@/components/previews/shared/color-utils";
import { PreviewFrame } from "@/components/previews/shared/preview-frame";

type Preset = {
  label: string;
  rgb: Rgb;
};

const presets: Preset[] = [
  { label: "Black", rgb: { r: 0, g: 0, b: 0 } },
  { label: "White", rgb: { r: 255, g: 255, b: 255 } },
  { label: "Warm", rgb: { r: 120, g: 74, b: 36 } },
  { label: "Steel", rgb: { r: 36, g: 61, b: 91 } },
  { label: "Cyan", rgb: { r: 0, g: 163, b: 224 } },
];

export function ShadowRgbPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [rgb, setRgb] = useState<Rgb>({ r: 36, g: 61, b: 91 });
  const hex = useMemo(() => rgbToHex(rgb), [rgb]);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: rgb,
      blur: 36,
      opacity: 0.2,
    },
  });

  const applyRgb = (next: Rgb) => {
    setRgb(next);
    update({ config: { shadowRGB: next } });
  };

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {presets.map(preset => (
            <button
              key={preset.label}
              className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
              onClick={() => applyRgb(preset.rgb)}
            >
              {preset.label}
            </button>
          ))}
          <label className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium">
            Color
            <input
              type="color"
              value={hex}
              onChange={event => applyRgb(hexToRgb(event.target.value))}
              className="h-7 w-8 cursor-pointer border-0 bg-transparent p-0"
            />
          </label>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">shadowRGB Preview</h2>
      </div>
    </PreviewFrame>
  );
}
