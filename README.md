# shinejs

A modern ESM-only TypeScript package for creating beautiful text and box shadows, optimized for React/Next.js projects.

## Installation

```bash
npm install shinejs
# or
yarn add shinejs
```

## Usage

The `shinejs` library provides a `useShine` React hook to easily apply dynamic text and box shadows to your components.

### `useShine(ref, config)`

This hook initializes the `Shine` effect on a DOM element referenced by `ref`.

- `ref`: A `React.RefObject<HTMLElement>` pointing to the DOM element you want to apply the effect to.
- `config`: (Optional) An object to customize the shadow appearance. This corresponds to the `ShineConfigSettings` interface.

The hook also sets up a `mousemove` event listener on `window` to update the light source's position, making the shadow follow the mouse by default.

### Example

```tsx
import * as React from "react";
import { useRef } from "react";
import { useShine } from "shinejs/react";

function MyShiningText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  useShine(textRef, {
    numSteps: 10,
    opacity: 0.2,
    offset: 0.2,
    blur: 60,
    shadowRGB: { r: 255, g: 255, b: 0 } // Yellow shadow
  });

  return (
    <h1 ref={textRef} style={{ fontSize: "4em", color: "white", position: "relative" }}>
      Hello Shine!
    </h1>
  );
}

export default MyShiningText;
```

### Custom Light Animation

For more advanced light source control (like the auto-pilot demo), you can instantiate the `Shine` class directly and manage its `light.position` and `draw()` calls.

```tsx
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Shine, ShineConfigSettings } from "shinejs";

function AutoPilotText({ config }: { config?: ShineConfigSettings }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [shineInstance, setShineInstance] = useState<Shine | null>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (headlineRef.current) {
      const instance = new Shine(headlineRef.current, config);
      setShineInstance(instance);

      const handleMouseMove = (event: MouseEvent) => {
        if (instance.light) {
          instance.light.position.x = event.clientX;
          instance.light.position.y = event.clientY;
          instance.draw();
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        instance.destroy();
      };
    }
  }, [config]);

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
    <h1 ref={headlineRef} style={{ fontSize: "4em", color: "white", position: "relative" }}>
      Auto-Pilot
    </h1>
  );
}

export default AutoPilotText;
```

## Configuration

The `useShine` hook and `Shine` class accept an optional configuration object to customize the shadow effect:

```typescript
type ShineConfigSettings = {
  numSteps?: number; // Number of shadow layers
  opacity?: number; // Base opacity of shadows (0.0 - 1.0)
  opacityPow?: number; // Power for opacity falloff
  offset?: number; // Base offset distance for shadows
  offsetPow?: number; // Power for offset falloff
  blur?: number; // Base blur radius for shadows
  blurPow?: number; // Power for blur falloff
  shadowRGB?: Color; // RGB color for the shadows (e.g., { r: 0, g: 0, b: 0 } for black)
};
```

## Development

### Build

```bash
npm run build
```

This will compile the TypeScript code and generate ESM JavaScript files and type declarations in the `dist` directory.

### Test

```bash
npm test
```

Runs the test suite using `vitest`.

### Lint

```bash
npm run lint
```

Lints the codebase using ESLint.

### Run Demos

```bash
npm run dev
```

Starts the Next.js development server for the demo application. Access the demos at `http://localhost:3000`.

## License

MIT
