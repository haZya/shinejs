'use client';

import React, { useRef, useState } from 'react';
import { Color, useShine } from 'shinejs-react';
import usePrefersDarkMode from '../hooks/use-dark-mode';

const DynamicDemo: React.FC = () => {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  const [blur, setBlur] = useState(40);
  const [opacity, setOpacity] = useState(0.15);
  const [intensity, setIntensity] = useState(1);

  const { update } = useShine(headlineRef, {
    lightPosition: "followMouse",
    shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0),
  });

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = Number(event.target.value);
    setBlur(newBlur);
    update({ config: { blur: newBlur } });
  };

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number(event.target.value);
    setOpacity(newOpacity);
    update({ config: { opacity: newOpacity } });
  };

  const handleIntensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIntensity = Number(event.target.value);
    setIntensity(newIntensity);
    update({ light: { intensity: newIntensity } });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="mb-16 w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="blur" className="font-medium">Blur: {blur}</label>
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
          <label htmlFor="opacity" className="font-medium">Opacity: {opacity.toFixed(2)}</label>
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
          <label htmlFor="intensity" className="font-medium">Intensity: {intensity.toFixed(2)}</label>
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
      </div>
      <h1 id="headline" ref={headlineRef} className="text-9xl text-center font-extrabold uppercase text-[#E4EBF5] dark:text-[#0a0a0a]">
        Shine Dynamic Demo
      </h1>
    </div>
  );
};

export default DynamicDemo;
