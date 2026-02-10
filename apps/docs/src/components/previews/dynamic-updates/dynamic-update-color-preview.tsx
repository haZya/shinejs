"use client";

import { useShine } from "@hazya/shinejs/react";
import { useRef, useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

export function DynamicUpdateColorPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const { update } = useShine(ref, {
    light: {
      intensity: 1.6,
      position: "followMouse",
    },
    config: {
      blur: 50,
      offset: 0.2,
      opacity: 0.3,
      shadowRGB: { r: 255, g: 0, b: 63 },
    },
  });

  const setDefaultColor = () => {
    update({ config: { shadowRGB: { r: 255, g: 0, b: 63 } } });
    setIsUpdated(false);
  };

  const setUpdatedColor = () => {
    update({ config: { shadowRGB: { r: 143, g: 0, b: 255 } } });
    setIsUpdated(true);
  };

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex justify-center gap-2">
          <PreviewOptionButton isActive={!isUpdated} onClick={setDefaultColor}>
            Default Color
          </PreviewOptionButton>
          <PreviewOptionButton isActive={isUpdated} onClick={setUpdatedColor}>
            Updated Color
          </PreviewOptionButton>
        </div>
        <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl dark:invert">
          Live Updates
        </h2>
      </div>
    </PreviewFrame>
  );
}
