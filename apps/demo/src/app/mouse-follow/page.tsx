"use client";

import { useRef } from "react";
import { Color, useShine } from "shinejs-react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function MouseFollowDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useShine(headlineRef, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0),
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <h1
        id="headline"
        ref={headlineRef}
        className="text-7xl sm:text-9xl font-extrabold text-center uppercase text-[#E4EBF5] dark:text-[#0a0a0a]"
      >
        Shine Mouse-Follow Demo
      </h1>
    </div>
  );
}

export default MouseFollowDemo;
