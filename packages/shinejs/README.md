# ShineJS

A modern ESM-only TypeScript library based on [bigspaceship/shine.js](https://github.com/bigspaceship/shine.js) for creating beautiful, interactive text and box shadows. Perfect for achieving **neumorphic** aesthetics, optimized for React and Next.js, but works perfectly in any modern JavaScript environment.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8e200840-1ec7-4894-95a8-06098b992f4c" alt="Shinejs demo" />
</p>

## Features

- **🚀 Performance:** Uses `requestAnimationFrame` and CSS hardware acceleration.
- **⚛️ React First:** Built-in `useShine` hook for seamless integration.
- **🎨 Neumorphism Ready:** Easily create soft, interactive neumorphic-text and box shadows.
- **✨ Interactive:** Shadows can follow the mouse or be animated programmatically.
- **🛠️ Customizable:** Fine-tune every aspect of the shadow effect.
- **📦 Lightweight:** ESM-only, tree-shakable, and minimal dependencies.

## Installation

```bash
npm install shinejs
```

## Usage

### React

The easiest way to use `shinejs` in a React application is with the `useShine` hook.

```tsx
import { useRef } from "react";
import { useShine } from "shinejs/react";

export function App() {
  const textRef = useRef<HTMLHeadingElement>(null);

  // Initialize the effect
  useShine(textRef, {
    light: { position: "followMouse" },
    config: {
      numSteps: 8,
      opacity: 0.3,
      blur: 40
    }
  });

  return (
    <h1 ref={textRef} style={{ fontSize: "4rem", color: "#fff" }}>
      Shining Bright
    </h1>
  );
}
```

### Vanilla JavaScript

For non-React projects, use the `Shine` class directly.

```javascript
import { Shine } from "shinejs";

const element = document.getElementById("my-element");
const shine = new Shine(element, {
  light: { position: "followMouse" }
});

// To stop the effect and clean up
// shine.destroy();
```

## API Reference

### `useShine(ref, options)`

React hook to apply the effect to a DOM element.

- `ref`: `React.RefObject<HTMLElement>`
- `options`: `ShineOptions` (optional)

Returns: `{ shine: Shine | null, update: (options: ShineOptions) => void }`

### `ShineOptions`

| Property          | Type                          | Default         | Description                           |
| :---------------- | :---------------------------- | :-------------- | :------------------------------------ |
| `config`          | `ShineConfigSettings`         | -               | Shadow appearance settings.           |
| `light`           | `object`                      | -               | Light source configuration.           |
| `light.position`  | `{x, y} \| 'followMouse'`     | `'followMouse'` | Position of the light source.         |
| `light.intensity` | `number`                      | `1.0`           | Brightness of the light.              |
| `content`         | `string`                      | -               | Replaces element content if provided. |
| `shadowProperty`  | `'textShadow' \| 'boxShadow'` | (auto)          | Property to use.                      |

### `ShineConfigSettings`

| Property    | Type        | Default     | Description              |
| :---------- | :---------- | :---------- | :----------------------- |
| `numSteps`  | `number`    | `5`         | Number of shadow layers. |
| `opacity`   | `number`    | `0.15`      | Base opacity (0-1).      |
| `offset`    | `number`    | `0.15`      | Distance offset.         |
| `blur`      | `number`    | `40`        | Blur radius.             |
| `shadowRGB` | `{r, g, b}` | `{0, 0, 0}` | Shadow color.            |

## Advanced Usage

### Manual Animation

You can manually control the light position for custom animations (e.g., following a path).

```javascript
const shine = new Shine(element);

function animate() {
  const x = Math.sin(Date.now() / 1000) * 100 + window.innerWidth / 2;
  const y = Math.cos(Date.now() / 1000) * 100 + window.innerHeight / 2;

  shine.light.position.x = x;
  shine.light.position.y = y;
  shine.draw(); // Request a redraw

  requestAnimationFrame(animate);
}

animate();
```

## License

MIT
