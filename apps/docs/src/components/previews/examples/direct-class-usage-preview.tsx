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
      config: {
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
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Class API Demo</h2>
    </PreviewFrame>
  );
}
