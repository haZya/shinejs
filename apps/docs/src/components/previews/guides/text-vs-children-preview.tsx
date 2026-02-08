"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function TextVsChildrenPreview() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useShine(textRef, {
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

  useShine(childrenRef, {
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

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div>
          <p className="mb-4 text-sm font-medium text-slate-600">
            Text target (textShadow)
          </p>
          <h3 ref={textRef} className="m-0! text-7xl font-black text-slate-200">
            Text Only
          </h3>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-slate-600">
            Children target (boxShadow)
          </p>
          <div ref={childrenRef} className="grid grid-cols-2 gap-6">
            <div className="h-16 rounded-xl bg-slate-200" />
            <div className="h-16 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ChildrenBoxShadowPreview() {
  const childrenRef = useRef<HTMLDivElement>(null);

  useShine(childrenRef, {
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

  return (
    <PreviewFrame>
      <div className="w-full max-w-3xl">
        <p className="mb-4 text-sm font-medium text-slate-600">
          Children target (boxShadow)
        </p>
        <div ref={childrenRef} className="grid grid-cols-2 gap-6">
          <div className="h-16 rounded-xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-200" />
        </div>
      </div>
    </PreviewFrame>
  );
}
