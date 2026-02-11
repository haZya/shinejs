"use client";

import type { CSSProperties } from "react";

import { Shine } from "@hazya/shinejs/react";
import { useState } from "react";

import { PreviewFrame } from "@/components/previews/shared/preview-frame";
import { PreviewOptionButton } from "@/components/previews/shared/preview-option-button";

const fontFamilies = {
  sans: {
    label: "Sans",
    value: "Inter, system-ui, sans-serif",
  },
  serif: {
    label: "Serif",
    value: "Georgia, \"Times New Roman\", serif",
  },
  mono: {
    label: "Mono",
    value: "\"JetBrains Mono\", \"Fira Code\", monospace",
  },
} as const;

const fontWeights = {
  regular: {
    label: "400",
    value: 400,
  },
  bold: {
    label: "700",
    value: 700,
  },
  black: {
    label: "900",
    value: 900,
  },
} as const;

const fontStyles = {
  normal: {
    label: "Normal",
    value: "normal",
  },
  italic: {
    label: "Italic",
    value: "italic",
  },
  oblique: {
    label: "Oblique",
    value: "oblique",
  },
} as const;

type FontFamilyKey = keyof typeof fontFamilies;
type FontWeightKey = keyof typeof fontWeights;
type FontStyleKey = keyof typeof fontStyles;

const localizedContent = {
  english: {
    label: "English",
    value: "Typography Shine",
  },
  chinese: {
    label: "Chinese",
    value: "排版光泽",
  },
  hindi: {
    label: "Hindi",
    value: "टाइपोग्राफी शाइन",
  },
  japanese: {
    label: "Japanese",
    value: "タイポグラフィ シャイン",
  },
  arabic: {
    label: "Arabic",
    value: "توهج الطباعة",
  },
} as const;

type ContentKey = keyof typeof localizedContent;

export function TypographyOptionsPreview() {
  const [fontFamily, setFontFamily] = useState<FontFamilyKey>("sans");
  const [fontWeight, setFontWeight] = useState<FontWeightKey>("black");
  const [fontStyle, setFontStyle] = useState<FontStyleKey>("normal");
  const [content, setContent] = useState<ContentKey>("english");

  const updateContent = (nextContent: ContentKey) => {
    setContent(nextContent);
  };

  const headingStyle: CSSProperties = {
    fontFamily: fontFamilies[fontFamily].value,
    fontStyle: fontStyles[fontStyle].value,
    fontWeight: fontWeights[fontWeight].value,
  };

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2!">
            <p className="m-0 text-center text-xs font-bold tracking-[0.14em] text-slate-600 uppercase">Font Family</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(fontFamilies).map(([key, option]) => (
                <PreviewOptionButton
                  key={key}
                  isActive={fontFamily === key}
                  onClick={() => setFontFamily(key as FontFamilyKey)}
                >
                  {option.label}
                </PreviewOptionButton>
              ))}
            </div>
          </div>

          <div className="space-y-2!">
            <p className="m-0 text-center text-xs font-bold tracking-[0.14em] text-slate-600 uppercase">Font Weight</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(fontWeights).map(([key, option]) => (
                <PreviewOptionButton
                  key={key}
                  isActive={fontWeight === key}
                  onClick={() => setFontWeight(key as FontWeightKey)}
                >
                  {option.label}
                </PreviewOptionButton>
              ))}
            </div>
          </div>

          <div className="space-y-2!">
            <p className="m-0 text-center text-xs font-bold tracking-[0.14em] text-slate-600 uppercase">Font Style</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(fontStyles).map(([key, option]) => (
                <PreviewOptionButton
                  key={key}
                  isActive={fontStyle === key}
                  onClick={() => setFontStyle(key as FontStyleKey)}
                >
                  {option.label}
                </PreviewOptionButton>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2!">
          <p className="m-0 text-center text-xs font-bold tracking-[0.14em] text-slate-600 uppercase">Content Language</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(localizedContent).map(([key, option]) => (
              <PreviewOptionButton
                key={key}
                isActive={content === key}
                onClick={() => updateContent(key as ContentKey)}
              >
                {option.label}
              </PreviewOptionButton>
            ))}
          </div>
        </div>

        <Shine
          as="h2"
          style={headingStyle}
          className="m-0! text-center text-4xl/tight text-slate-200 lg:text-7xl/tight"
          options={{
            light: {
              intensity: 1.2,
              position: "followMouse",
            },
            config: {
              blur: 36,
              opacity: 0.3,
              offset: 0.08,
              shadowRGB: { r: 24, g: 41, b: 71 },
            },
          }}
        >
          {localizedContent[content].value}
        </Shine>
      </div>
    </PreviewFrame>
  );
}
