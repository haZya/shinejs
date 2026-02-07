"use client";

import { useRef, useState } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function ReactUseShineGuidePreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [opacity, setOpacity] = useState(0.18);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { blur: 36, opacity },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => {
              const nextOpacity = Math.min(0.32, opacity + 0.04);
              setOpacity(nextOpacity);
              update({ config: { opacity: nextOpacity } });
            }}
          >
            Increase Opacity
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Adjust Me</h2>
      </div>
    </PreviewFrame>
  );
}
