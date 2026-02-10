"use client";

import { useShine } from "@hazya/shinejs/react";
import { useRef, useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

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

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-2">
          <PreviewOptionButton isActive={activeContent === "change"} onClick={() => updateContent("change", "Change Text Demo")}>
            Change Text Demo
          </PreviewOptionButton>
          <PreviewOptionButton isActive={activeContent === "hello"} onClick={() => updateContent("hello", "Hello World")}>
            Hello World
          </PreviewOptionButton>
          <PreviewOptionButton isActive={activeContent === "lorem"} onClick={() => updateContent("lorem", "Lorem Ipsum")}>
            Lorem Ipsum
          </PreviewOptionButton>
        </div>
        <h2 ref={ref} className="m-0! text-center text-4xl font-black text-slate-200 sm:text-5xl lg:text-7xl xl:text-8xl">
          Change Text Demo
        </h2>
      </div>
    </PreviewFrame>
  );
}
