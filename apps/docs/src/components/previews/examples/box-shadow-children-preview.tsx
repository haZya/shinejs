"use client";

import { Shine } from "@hazya/shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function BoxShadowChildrenPreview() {
  return (
    <PreviewFrame>
      <Shine
        as="div"
        className="grid w-full max-w-xl grid-cols-2 gap-6"
        options={{
          light: {
            intensity: 1.2,
          },
          config: {
            blur: 36,
            opacity: 0.3,
            offset: 0.08,
            shadowRGB: { r: 24, g: 41, b: 71 },
          },
        }}
      >
        <div className="h-24 rounded-lg bg-slate-200" />
        <div className="h-24 rounded-lg bg-slate-200" />
      </Shine>
    </PreviewFrame>
  );
}
