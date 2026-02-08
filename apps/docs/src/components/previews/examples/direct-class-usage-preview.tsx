"use client";

import { useEffect, useRef } from "react";
import { Color, Shine } from "shinejs";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function DirectClassUsagePreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const shine = new Shine(ref.current, {
      light: {
        intensity: 1.2,
        position: "followMouse",
      },
      config: {
        blur: 36,
        offset: 0.08,
        opacity: 0.3,
        shadowRGB: new Color(24, 41, 71),
      },
    });

    shine.enableMouseTracking();
    shine.enableAutoUpdates();

    return () => {
      shine.destroy();
    };
  }, []);

  return (
    <PreviewFrame>
      <h2 ref={ref} className="m-0! text-center text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-200">
        Class API Demo
      </h2>
    </PreviewFrame>
  );
}
