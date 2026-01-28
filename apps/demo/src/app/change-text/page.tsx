"use client";

import { useRef } from "react";
import { Color, useShine } from "shinejs-react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function ChangeTextDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(headlineRef, {
    config: {
      shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0),
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-20 p-16">
      <div className="flex flex-wrap gap-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => update({ content: "Change Text Demo" })}
        >
          Change Text Demo
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => update({ content: "Hello World" })}
        >
          Hello World
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => update({ content: "Lorem Ipsum" })}
        >
          Lorem Ipsum
        </button>
      </div>
      <h1 id="headline" ref={headlineRef} className="text-7xl sm:text-9xl font-extrabold text-center uppercase text-[#E4EBF5] dark:text-[#0a0a0a]">
        Change Text Demo
      </h1>
    </div>
  );
}

export default ChangeTextDemo;
