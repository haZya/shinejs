"use client";

import { useRef, useState } from "react";
import { useShine } from "shinejs/react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { cn } from "@/lib/utils";

type ContentKey = "change" | "hello" | "lorem";

export function ChangeContentPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [activeContent, setActiveContent] = useState<ContentKey>("change");

  const { update } = useShine(ref, {
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

  const updateContent = (key: ContentKey, content: string) => {
    update({ content });
    setActiveContent(key);
  };

  const buttonClassName = (isActive: boolean) =>
    cn(
      "rounded-md border-2 border-slate-300 px-3 py-1.5 text-sm font-semibold text-black transition",
      isActive
        ? "bg-slate-200 text-slate-400"
        : "cursor-pointer text-slate-900 hover:border-slate-400 hover:bg-slate-300",
    );

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className={buttonClassName(activeContent === "change")}
            onClick={() => updateContent("change", "Change Text Demo")}
          >
            Change Text Demo
          </button>
          <button
            className={buttonClassName(activeContent === "hello")}
            onClick={() => updateContent("hello", "Hello World")}
          >
            Hello World
          </button>
          <button
            className={buttonClassName(activeContent === "lorem")}
            onClick={() => updateContent("lorem", "Lorem Ipsum")}
          >
            Lorem Ipsum
          </button>
        </div>
        <h2 ref={ref} className="m-0! text-center text-8xl font-black text-slate-200">
          Change Text Demo
        </h2>
      </div>
    </PreviewFrame>
  );
}
