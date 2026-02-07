"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function TextVsChildrenPreview() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useShine(textRef, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 } },
  });

  useShine(childrenRef, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 20 },
  });

  return (
    <PreviewFrame>
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Text target (textShadow)</p>
          <h3 ref={textRef} className="text-3xl font-black text-slate-200">Text Only</h3>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Children target (boxShadow)</p>
          <div ref={childrenRef} className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg bg-linear-to-br from-indigo-100 to-indigo-300" />
            <div className="h-16 rounded-lg bg-linear-to-br from-amber-100 to-orange-300" />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
