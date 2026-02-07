"use client";

import type { CSSProperties, ReactNode } from "react";

const panelStyle: CSSProperties = {
  background: "radial-gradient(circle at 20% 20%, #f2f6ff 0%, #d8e2f3 55%, #ccd8ec 100%)",
};

export function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div style={panelStyle} className="rounded-xl border p-6">
      <div className="flex min-h-44 items-center justify-center rounded-lg bg-white/45 p-4 shadow-inner">
        {children}
      </div>
    </div>
  );
}
