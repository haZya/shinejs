"use client";

import Link from "next/link";
import { useRef } from "react";
import { useShine } from "shinejs-react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function MouseFollowDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useShine(headlineRef, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-16">
      <Link href="/" className="absolute top-16 left-16 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <h1
        id="headline"
        ref={headlineRef}
        className="mt-16 text-center text-7xl font-extrabold uppercase sm:text-9xl"
      >
        Shine Mouse-Follow Demo
      </h1>
    </div>
  );
}

export default MouseFollowDemo;
