"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Color, Shine } from "shinejs-react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function ClassDirectUsageDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      // Direct instantiation of Shine class
      const shine = new Shine(headlineRef.current, {
        config: {
          shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0),
        },
      });

      // Enable mouse tracking directly
      shine.enableMouseTracking();

      // Enable auto updates for scroll/resize
      shine.enableAutoUpdates();

      return () => {
        // Proper cleanup
        shine.destroy();
      };
    }
  }, [isDarkMode]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-16">
      <Link href="/" className="absolute top-16 left-16 text-blue-500 hover:text-blue-700 font-medium">
        ← Back to Home
      </Link>
      <div className="max-w-2xl text-center my-16">
        <h2 className="title dark:invert text-4xl text-center font-bold mb-6">Direct Class Usage</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This demo instantiates the
          {" "}
          <code>Shine</code>
          {" "}
          class directly in a
          {" "}
          <code>useEffect</code>
          {" "}
          hook, bypassing the
          {" "}
          <code>useShine</code>
          {" "}
          hook. It demonstrates how to manually call
          <code>enableMouseTracking()</code>
          {" "}
          and
          <code>enableAutoUpdates()</code>
          .
        </p>
      </div>
      <h1
        id="headline"
        ref={headlineRef}
        className="text-7xl sm:text-9xl font-extrabold text-center uppercase"
      >
        Class Shine Demo
      </h1>
    </div>
  );
}

export default ClassDirectUsageDemo;
