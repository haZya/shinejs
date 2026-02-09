"use client";

import { useShine } from "@hazya/shinejs/react";
import Link from "next/link";
import { useRef } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function ChangeTextDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(headlineRef, {
    config: {
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-16 p-16">
      <Link href="/" className="absolute top-16 left-16 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <div className="mt-16 flex flex-wrap gap-3">
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => update({ content: "Change Text Demo" })}
        >
          Change Text Demo
        </button>
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => update({ content: "Hello World" })}
        >
          Hello World
        </button>
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => update({ content: "Lorem Ipsum" })}
        >
          Lorem Ipsum
        </button>
      </div>
      <h1 id="headline" ref={headlineRef} className="text-center text-7xl font-extrabold uppercase sm:text-9xl">
        Change Text Demo
      </h1>
    </div>
  );
}

export default ChangeTextDemo;
