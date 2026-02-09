"use client";

import type { ChangeEvent } from "react";

import { useShine } from "@hazya/shinejs/react";
import Link from "next/link";
import { useRef, useState } from "react";

import usePrefersDarkMode from "../hooks/use-dark-mode";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function DynamicDemo() {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [blur, setBlur] = useState(40);
  const [blurPow, setBlurPow] = useState(1.0);
  const [opacity, setOpacity] = useState(0.15);
  const [opacityPow, setOpacityPow] = useState(1.2);
  const [offset, setOffset] = useState(0.15);
  const [offsetPow, setOffsetPow] = useState(1.8);
  const [intensity, setIntensity] = useState(1);
  const [shadowColor, setShadowColor] = useState(isDarkMode ? "#ffffff" : "#000000");

  const { update } = useShine(headlineRef, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
    },
  });

  const handleBlurChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newBlur = Number(event.target.value);
    setBlur(newBlur);
    update({ config: { blur: newBlur } });
  };

  const handleBlurPowChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newBlurPow = Number(event.target.value);
    setBlurPow(newBlurPow);
    update({ config: { blurPow: newBlurPow } });
  };

  const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number(event.target.value);
    setOpacity(newOpacity);
    update({ config: { opacity: newOpacity } });
  };

  const handleOpacityPowChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOpacityPow = Number(event.target.value);
    setOpacityPow(newOpacityPow);
    update({ config: { opacityPow: newOpacityPow } });
  };

  const handleOffsetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOffset = Number(event.target.value);
    setOffset(newOffset);
    update({ config: { offset: newOffset } });
  };

  const handleOffsetPowChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOffsetPow = Number(event.target.value);
    setOffsetPow(newOffsetPow);
    update({ config: { offsetPow: newOffsetPow } });
  };

  const handleIntensityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newIntensity = Number(event.target.value);
    setIntensity(newIntensity);
    update({ light: { intensity: newIntensity } });
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColorHex = event.target.value;
    setShadowColor(newColorHex);
    update({ config: { shadowRGB: hexToRgb(newColorHex) } });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-16 p-16">
      <Link href="/" className="absolute top-16 left-16 font-medium text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <div className="mt-16 grid w-full gap-6 sm:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label htmlFor="blur" className="font-medium">
            Blur:
            {blur}
          </label>
          <input
            id="blur"
            type="range"
            min="0"
            max="100"
            value={blur}
            onChange={handleBlurChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="blurPow" className="font-medium">
            Blur Power:
            {blurPow.toFixed(2)}
          </label>
          <input
            id="blurPow"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={blurPow}
            onChange={handleBlurPowChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="opacity" className="font-medium">
            Opacity:
            {opacity.toFixed(2)}
          </label>
          <input
            id="opacity"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="opacityPow" className="font-medium">
            Opacity Power:
            {opacityPow.toFixed(2)}
          </label>
          <input
            id="opacityPow"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={opacityPow}
            onChange={handleOpacityPowChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="offset" className="font-medium">
            Offset:
            {offset.toFixed(2)}
          </label>
          <input
            id="offset"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={offset}
            onChange={handleOffsetChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="offsetPow" className="font-medium">
            Offset Power:
            {offsetPow.toFixed(2)}
          </label>
          <input
            id="offsetPow"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={offsetPow}
            onChange={handleOffsetPowChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="intensity" className="font-medium">
            Intensity:
            {intensity.toFixed(2)}
          </label>
          <input
            id="intensity"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={intensity}
            onChange={handleIntensityChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="color" className="font-medium">Shadow Color</label>
          <input
            id="color"
            type="color"
            value={shadowColor}
            onChange={handleColorChange}
            className="h-10 w-full cursor-pointer rounded-md border-none"
          />
        </div>
      </div>
      <h1 id="headline" ref={headlineRef} className="text-center text-7xl font-extrabold uppercase sm:text-9xl">
        Shine Dynamic Demo
      </h1>
    </div>
  );
}

export default DynamicDemo;
