"use client";

import type { ShineOptions } from "@hazya/shinejs";

import { Shine } from "@hazya/shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

const defaultOptions: ShineOptions = {
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
};

export function TextVsChildrenPreview() {
  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div>
          <p className="mb-4 text-sm font-medium text-slate-600">
            Text target (textShadow)
          </p>
          <Shine as="h3" className="m-0! text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl" options={defaultOptions}>
            Text Only
          </Shine>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-slate-600">
            Children target (boxShadow)
          </p>
          <Shine as="div" className="grid grid-cols-2 gap-6" options={defaultOptions}>
            <div className="h-16 rounded-xl bg-slate-200" />
            <div className="h-16 rounded-xl bg-slate-200" />
          </Shine>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ChildrenBoxShadowPreview() {
  return (
    <PreviewFrame>
      <div className="w-full max-w-3xl">
        <p className="mb-4 text-sm font-medium text-slate-600">
          Children target (boxShadow)
        </p>
        <Shine as="div" className="grid grid-cols-2 gap-6" options={defaultOptions}>
          <div className="h-16 rounded-xl bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-200" />
        </Shine>
      </div>
    </PreviewFrame>
  );
}
