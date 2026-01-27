'use client';

import React, { useEffect, useRef } from 'react';
import { Color, Shine } from 'shinejs-react';
import usePrefersDarkMode from '../hooks/use-dark-mode';

const ClassDirectUsageDemo: React.FC = () => {
  const isDarkMode = usePrefersDarkMode();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      // Direct instantiation of Shine class
      const shine = new Shine(headlineRef.current, {
        config: {
          shadowRGB: isDarkMode ? new Color(255, 255, 255) : new Color(0, 0, 0)
        }
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
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="max-w-2xl text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Direct Class Usage</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This demo instantiates the <code>Shine</code> class directly in a <code>useEffect</code> hook, 
          bypassing the <code>useShine</code> hook. It demonstrates how to manually call 
          <code>enableMouseTracking()</code> and <code>enableAutoUpdates()</code>.
        </p>
      </div>
      <h1
        id="headline"
        ref={headlineRef}
        className="text-9xl font-extrabold text-center uppercase text-[#E4EBF5] dark:text-[#0a0a0a]"
      >
        Class Shine
      </h1>
    </div>
  );
};

export default ClassDirectUsageDemo;
