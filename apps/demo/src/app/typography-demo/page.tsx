"use client";

import { useShine } from "@hazya/shinejs/react";
import Link from "next/link";
import { useRef, useState } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

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

type FontFamilyKey = keyof typeof fontFamilies;
type FontWeightKey = keyof typeof fontWeights;
type FontStyleKey = keyof typeof fontStyles;
type ContentKey = keyof typeof localizedContent;

function TypographyDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [fontFamily, setFontFamily] = useState<FontFamilyKey>("sans");
  const [fontWeight, setFontWeight] = useState<FontWeightKey>("black");
  const [fontStyle, setFontStyle] = useState<FontStyleKey>("normal");
  const [content, setContent] = useState<ContentKey>("english");

  const { update } = useShine(headlineRef, {
    light: { position: "followMouse", intensity: 1.2 },
    config: {
      blur: 36,
      opacity: 0.3,
      offset: 0.08,
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 24, g: 41, b: 71 },
    },
  });

  const setContentLanguage = (nextContent: ContentKey) => {
    update({ content: localizedContent[nextContent].value });
    setContent(nextContent);
  };

  const optionButtonClass = (isActive: boolean) =>
    `rounded-md border px-3 py-1 text-sm font-semibold transition ${
      isActive
        ? "border-blue-600 bg-blue-100 text-blue-900"
        : "cursor-pointer border-blue-300 bg-white text-blue-800 hover:border-blue-500 hover:bg-blue-50"
    }`;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 p-8 sm:p-16">
      <Link href="/" className="absolute top-8 left-8 font-medium text-blue-500 hover:text-blue-700 sm:top-16 sm:left-16">
        ← Back to Home
      </Link>

      <div className="mt-16 flex w-full max-w-5xl flex-col gap-6 rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm sm:p-8 dark:bg-white/5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.14em] text-slate-600 uppercase dark:text-slate-300">Font Family</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(fontFamilies).map(([key, option]) => (
                <button key={key} className={optionButtonClass(fontFamily === key)} onClick={() => setFontFamily(key as FontFamilyKey)}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.14em] text-slate-600 uppercase dark:text-slate-300">Font Weight</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(fontWeights).map(([key, option]) => (
                <button key={key} className={optionButtonClass(fontWeight === key)} onClick={() => setFontWeight(key as FontWeightKey)}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.14em] text-slate-600 uppercase dark:text-slate-300">Font Style</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(fontStyles).map(([key, option]) => (
                <button key={key} className={optionButtonClass(fontStyle === key)} onClick={() => setFontStyle(key as FontStyleKey)}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-[0.14em] text-slate-600 uppercase dark:text-slate-300">Content Language</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(localizedContent).map(([key, option]) => (
              <button key={key} className={optionButtonClass(content === key)} onClick={() => setContentLanguage(key as ContentKey)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h1
        id="headline"
        ref={headlineRef}
        style={{
          fontFamily: fontFamilies[fontFamily].value,
          fontStyle: fontStyles[fontStyle].value,
          fontWeight: fontWeights[fontWeight].value,
        }}
        className="mt-16 text-center text-5xl font-extrabold uppercase sm:text-7xl lg:text-9xl"
      >
        {localizedContent.english.value}
      </h1>
    </div>
  );
}

export default TypographyDemo;
