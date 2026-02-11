"use client";

import { Shine } from "@hazya/shinejs/react";
import Link from "next/link";
import { useState } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function ChangeTextDemo() {
  const isDarkMode = usePrefersDarkMode();
  const [content, setContent] = useState("Change Text Demo");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-16 p-16">
      <Link href="/" className="absolute top-16 left-16 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <div className="mt-16 flex flex-wrap gap-3">
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setContent("Change Text Demo")}
        >
          Change Text Demo
        </button>
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setContent("Hello World")}
        >
          Hello World
        </button>
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setContent("Lorem Ipsum")}
        >
          Lorem Ipsum
        </button>
      </div>
      <Shine
        as="h1"
        id="headline"
        className="text-center text-7xl font-extrabold uppercase sm:text-9xl"
        options={{
          light: { intensity: 1.2 },
          config: {
            blur: 36,
            opacity: 0.3,
            offset: 0.08,
            shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 24, g: 41, b: 71 },
          },
        }}
      >
        {content}
      </Shine>
    </div>
  );
}

export default ChangeTextDemo;
