'use client';

import React, { useRef } from 'react';
import { Color, useShine } from 'shinejs-react';
import usePrefersDarkMode from '../hooks/use-dark-mode';

const ChangeTextDemo: React.FC = () => {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  const { update } = useShine(headlineRef, {
    followMouse: true, // true by default, but explicitly stating for clarity
    shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0)
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => update({ content:'Shine Mouse-Follow Demo' })}
        >
          Shine Mouse-Follow Demo
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => update({ content:'Hello World' })}
        >
          Hello World
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => update({ content:'Lorem Ipsum' })}
        >
          Lorem Ipsum
        </button>
      </div>
      <h1 id="headline" ref={headlineRef} className="text-9xl font-extrabold text-center uppercase text-[#E4EBF5] dark:text-[#0a0a0a]">
        Shine Change-Text Demo
      </h1>
    </div>
  );
};

export default ChangeTextDemo;
