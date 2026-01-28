"use client";

import Link from "next/link";
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
