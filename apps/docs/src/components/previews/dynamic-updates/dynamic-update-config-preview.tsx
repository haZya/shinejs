"use client";

import type { ShineOptions } from "shinejs";

import { useRef, useState } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { cn } from "@/lib/utils";

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
            onClick={setInitialConfig}
          >
            Initial Config
          </button>
          <button
            className={buttonClassName(isUpdated)}
            onClick={setUpdatedConfig}
          >
            Updated Config
          </button>
        </div>
        <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
          Live Updates
        </h2>
      </div>
    </PreviewFrame>
  );
}
