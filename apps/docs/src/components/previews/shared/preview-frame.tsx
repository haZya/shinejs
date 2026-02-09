"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const panelStyle: CSSProperties = {
  background: "radial-gradient(circle at 20% 20%, #f2f6ff 0%, #d8e2f3 55%, #ccd8ec 100%)",
};

export function PreviewFrame({ disableGutter, children }: { disableGutter?: boolean; children: ReactNode }) {
  return (
    <div style={panelStyle} className="rounded-xl border p-6 dark:invert">
      <div className={cn("flex justify-center rounded-lg bg-white/45 shadow-inner", !disableGutter && "p-16")}>
        {children}
      </div>
    </div>
  );
}
