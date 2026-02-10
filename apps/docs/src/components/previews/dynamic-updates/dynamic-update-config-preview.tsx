"use client";

import type { ShineOptions } from "@hazya/shinejs";

import { useShine } from "@hazya/shinejs/react";
import { useRef, useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

const initialConfig: ShineOptions = {
  light: {
    intensity: 1.2,
    position: "followMouse",
  },
  config: {
    blur: 36,
    offset: 0.08,
    offsetPow: 1.8,
    opacity: 0.3,
    shadowRGB: { r: 24, g: 41, b: 71 },
  },
};

export function DynamicUpdateConfigPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const { update } = useShine(ref, initialConfig);

  const setInitialConfig = () => {
    update(initialConfig);
    setIsUpdated(false);
  };

  const setUpdatedConfig = () => {
    update({
      config: {
        offset: 0.015,
        offsetPow: 0,
      },
    });
    setIsUpdated(true);
  };

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex justify-center gap-2">
          <PreviewOptionButton isActive={!isUpdated} onClick={setInitialConfig}>
            Initial Config
          </PreviewOptionButton>
          <PreviewOptionButton isActive={isUpdated} onClick={setUpdatedConfig}>
            Updated Config
          </PreviewOptionButton>
        </div>
        <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
          Live Updates
        </h2>
      </div>
    </PreviewFrame>
  );
}
