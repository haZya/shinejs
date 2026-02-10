"use client";

import { useShine } from "@hazya/shinejs/react";
import { useRef, useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

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
        <PreviewOptionButton isActive onClick={changeOpacity}>
          {opacity === 0.24 ? "Increase Opacity (0.4)" : "Decrease Opacity (0.24)"}
        </PreviewOptionButton>
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
