'use client';

import React, { useEffect, useRef } from 'react';
import { useShine } from 'shinejs-react';

const AutoPilotChildrenDemo: React.FC = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const shineInstance = useShine(headlineRef);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (shineInstance) {
      const update = () => {
        const time = new Date().getTime();
        const speed = 0.00025;
        const phase = time * speed * 2.0 * Math.PI;
        const radiusX = window.innerWidth * 0.5;
        const radiusY = window.innerHeight * 0.5;

        shineInstance.light.position.x = radiusX + radiusX * Math.cos(phase);
        shineInstance.light.position.y = radiusY + radiusY * Math.sin(phase * 0.7);
        shineInstance.draw();

        animationFrameId.current = window.requestAnimationFrame(update);
      };

      animationFrameId.current = window.requestAnimationFrame(update);

      return () => {
        if (animationFrameId.current) {
          window.cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [shineInstance]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div id="headline" ref={headlineRef} className="flex space-x-4">
        <img src="https://via.placeholder.com/150/ffcc99" alt="Placeholder 1" />
        <img src="https://via.placeholder.com/150/ccff99" alt="Placeholder 2" />
        <img src="https://via.placeholder.com/150/cc99ff" alt="Placeholder 3" />
      </div>
    </div>
  );
};

export default AutoPilotChildrenDemo;
