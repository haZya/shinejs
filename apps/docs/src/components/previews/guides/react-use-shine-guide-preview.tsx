"use client";

import { useRef, useState } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function ReactUseShineGuidePreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [opacity, setOpacity] = useState(0.24);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: {
      blur: 36,
      offset: 0.08,
      opacity,
      shadowRGB: { r: 24, g: 41, b: 71 },
    },
  });

  const changeOpacity = () => {
    const nextOpacity = opacity === 0.24 ? 0.4 : 0.24;
    setOpacity(nextOpacity);
    update({ config: { opacity: nextOpacity } });
  };

  return (
    <PreviewFrame>
      <div className="flex flex-col items-center gap-8">
        <button
          className="w-fit cursor-pointer rounded-md border-2 border-slate-300 bg-slate-200 px-3 py-1.5 text-sm font-medium text-black hover:border-slate-400"
          onClick={changeOpacity}
        >
          {opacity === 0.24 ? "Increase Opacity (0.4)" : "Decrease Opacity (0.24)"}
        </button>
        <h2
          ref={ref}
          className="text-center text-4xl font-black tracking-tight text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl"
        >
          Adjust Me
        </h2>
      </div>
    </PreviewFrame>
  );
}
