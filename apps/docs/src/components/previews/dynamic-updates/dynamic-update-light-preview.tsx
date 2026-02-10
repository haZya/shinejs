"use client";

import { useShine } from "@hazya/shinejs/react";
import { useEffect, useRef, useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

export function DynamicUpdateLightPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const frame = useRef<number | null>(null);
  const [mode, setMode] = useState<"followMouse" | "fixed" | "autoPilot">("followMouse");

  const { update } = useShine(ref, {
    light: {
      intensity: 1.2,
      position: "followMouse",
    },
    config: {
      blur: 36,
      offset: 0.08,
      opacity: 0.3,
      shadowRGB: { r: 24, g: 41, b: 71 },
    },
  });

  const setDefaultLight = () => {
    update({ light: { position: "followMouse" } });
    setMode("followMouse");
  };

  const setUpdatedLight = () => {
    update({ light: { position: { x: 320, y: 140 } } });
    setMode("fixed");
  };

  const setAutoPilotLight = () => {
    setMode("autoPilot");
  };

  useEffect(() => {
    if (mode !== "autoPilot") {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
      return;
    }

    const animate = () => {
      const t = Date.now() * 0.00025 * Math.PI * 2;
      const x = window.innerWidth * 0.5 + window.innerWidth * 0.4 * Math.cos(t);
      const y = window.innerHeight * 0.5 + window.innerHeight * 0.4 * Math.sin(t * 0.7);
      update({ light: { position: { x, y } } });
      frame.current = window.requestAnimationFrame(animate);
    };

    frame.current = window.requestAnimationFrame(animate);

    return () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [mode, update]);

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex justify-center gap-2">
          <PreviewOptionButton isActive={mode === "followMouse"} onClick={setDefaultLight}>
            Follow Mouse Light
          </PreviewOptionButton>
          <PreviewOptionButton isActive={mode === "fixed"} onClick={setUpdatedLight}>
            Fixed Light
          </PreviewOptionButton>
          <PreviewOptionButton isActive={mode === "autoPilot"} onClick={setAutoPilotLight}>
            Auto Pilot Light
          </PreviewOptionButton>
        </div>
        <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
          Live Updates
        </h2>
      </div>
    </PreviewFrame>
  );
}
