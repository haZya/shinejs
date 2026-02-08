"use client";

import { useRef, useState } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { cn } from "@/lib/utils";

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

  const buttonClassName = (isActive: boolean) =>
    cn(
      "rounded-md border-2 border-slate-300 px-3 py-1.5 text-sm font-semibold text-black transition",
      isActive
        ? "bg-slate-200 text-slate-400"
        : "cursor-pointer text-slate-900 hover:border-slate-400 hover:bg-slate-300",
    );

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex justify-center gap-2">
          <button
            className={buttonClassName(!isUpdated)}
            onClick={setDefaultColor}
          >
            Default Color
          </button>
          <button
            className={buttonClassName(isUpdated)}
            onClick={setUpdatedColor}
          >
            Updated Color
          </button>
        </div>
        <h2 ref={ref} className="m-0! text-center text-8xl font-black text-slate-200 dark:invert">
          Live Updates
        </h2>
      </div>
    </PreviewFrame>
  );
}
