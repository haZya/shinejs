"use client";

import { useShine } from "@hazya/shinejs/react";
import { useMemo, useRef, useState } from "react";

import type { Rgb } from "@/components/previews/shared/color-utils";

import { hexToRgb, rgbToHex } from "@/components/previews/shared/color-utils";
import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { cn } from "@/lib/utils";

type Preset = {
  label: string;
  rgb: Rgb;
};

type ShadowRgbPreviewProps = {
  variant?: "starter" | "vibrant" | "dynamic";
};

const starterPresets: Preset[] = [
  { label: "Midnight", rgb: { r: 12, g: 16, b: 32 } },
  { label: "Cloud", rgb: { r: 44, g: 147, b: 255 } },
  { label: "Slate", rgb: { r: 36, g: 61, b: 91 } },
];

const vibrantPresets: Preset[] = [
  { label: "Neon Azure", rgb: { r: 0, g: 195, b: 255 } },
  { label: "Solar Coral", rgb: { r: 255, g: 98, b: 72 } },
  { label: "Electric Violet", rgb: { r: 123, g: 75, b: 255 } },
  { label: "Lime Pulse", rgb: { r: 112, g: 214, b: 78 } },
  { label: "Ruby Depth", rgb: { r: 205, g: 32, b: 78 } },
];

const dynamicPresets: Preset[] = [
  { label: "Day", rgb: { r: 30, g: 98, b: 201 } },
  { label: "Night", rgb: { r: 12, g: 16, b: 32 } },
];

export function ShadowRgbPreview({ variant = "starter" }: ShadowRgbPreviewProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isDarkSurface, setIsDarkSurface] = useState(true);

  const presets = useMemo(() => {
    if (variant === "vibrant")
      return vibrantPresets;
    if (variant === "dynamic")
      return dynamicPresets;
    return starterPresets;
  }, [variant]);

  const [rgb, setRgb] = useState<Rgb>(presets[0].rgb);
  const hex = useMemo(() => rgbToHex(rgb), [rgb]);
  const glowStyle = useMemo(() => ({
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
  }), [rgb]);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: rgb,
      blur: variant === "vibrant" ? 42 : 36,
      opacity: variant === "dynamic" ? 0.18 : 0.2,
    },
  });

  const applyRgb = (next: Rgb) => {
    setRgb(next);
    update({ config: { shadowRGB: next } });
  };

  return (
    <PreviewFrame disableGutter>
      <div className={cn("relative flex w-full max-w-4xl flex-col gap-6 overflow-hidden rounded-lg border p-6", isDarkSurface
        ? "from-slate-950 via-slate-900 to-slate-950"
        : "from-sky-100 via-white to-indigo-100")}
      >
        <div className="pointer-events-none absolute -inset-x-10 -bottom-12 h-40 blur-3xl" style={glowStyle} />

        <div className="flex flex-wrap justify-center gap-2">
          {presets.map(preset => (
            <button
              key={preset.label}
              className="rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-sm font-semibold text-slate-800 backdrop-blur-sm"
              onClick={() => applyRgb(preset.rgb)}
            >
              {preset.label}
            </button>
          ))}
          <label className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-sm font-semibold text-slate-800 backdrop-blur-sm">
            Color
            <input
              type="color"
              value={hex}
              onChange={event => applyRgb(hexToRgb(event.target.value))}
              className="h-7 w-8 cursor-pointer border-0 bg-transparent p-0"
            />
          </label>
          {variant === "dynamic" && (
            <button
              className="rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-sm font-semibold text-slate-800 backdrop-blur-sm"
              onClick={() => {
                setIsDarkSurface(prev => !prev);
                applyRgb(rgb);
              }}
            >
              Surface:
              {isDarkSurface ? "Dark" : "Light"}
            </button>
          )}
        </div>

        <h2 ref={ref} className={cn("text-center text-4xl font-black tracking-tight lg:text-7xl", isDarkSurface ? "text-slate-100" : "text-slate-800")}>
          shadowRGB Preview
        </h2>
      </div>
    </PreviewFrame>
  );
}
