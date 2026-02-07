"use client";

import { useRef } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";

export function ChangeContentPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse" },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Change Text Demo" })}
          >
            Change Text Demo
          </button>
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Hello World" })}
          >
            Hello World
          </button>
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Lorem Ipsum" })}
          >
            Lorem Ipsum
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Change Text Demo</h2>
      </div>
    </PreviewFrame>
  );
}
