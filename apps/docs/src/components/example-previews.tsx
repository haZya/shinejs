"use client";

import type { CSSProperties } from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Shine } from "shinejs";
import { useShine } from "shinejs/react";

type Preset = {
  label: string;
  rgb: { r: number; g: number; b: number };
};

const panelStyle: CSSProperties = {
  background: "radial-gradient(circle at 20% 20%, #f2f6ff 0%, #d8e2f3 55%, #ccd8ec 100%)",
};

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={panelStyle} className="rounded-xl border p-6">
      <div className="flex min-h-44 items-center justify-center rounded-lg bg-white/45 p-4 shadow-inner">
        {children}
      </div>
    </div>
  );
}

export function MouseFollowPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 } },
  });

  return (
    <PreviewFrame>
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Shine Mouse Follow</h2>
    </PreviewFrame>
  );
}

export function AutoPilotPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const frame = useRef<number | null>(null);
  const { update } = useShine(ref, {
    config: { blur: 38, shadowRGB: { r: 0, g: 0, b: 0 } },
  });

  useEffect(() => {
    const animate = () => {
      const t = Date.now() * 0.00025 * Math.PI * 2;
      const x = window.innerWidth * 0.5 + window.innerWidth * 0.4 * Math.cos(t);
      const y = window.innerHeight * 0.5 + window.innerHeight * 0.4 * Math.sin(t * 0.7);
      update({ light: { position: { x, y } } });
      frame.current = window.requestAnimationFrame(animate);
    };

    frame.current = window.requestAnimationFrame(animate);
    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [update]);

  return (
    <PreviewFrame>
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Auto Pilot</h2>
    </PreviewFrame>
  );
}

export function BoxShadowChildrenPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useShine(ref, {
    config: {
      shadowRGB: { r: 0, g: 0, b: 0 },
      blur: 22,
      opacity: 0.2,
    },
  });

  return (
    <PreviewFrame>
      <div ref={ref} className="grid w-full max-w-xl grid-cols-3 gap-3">
        <div className="h-24 rounded-lg bg-linear-to-br from-cyan-100 to-cyan-300" />
        <div className="h-24 rounded-lg bg-linear-to-br from-rose-100 to-orange-300" />
        <div className="h-24 rounded-lg bg-linear-to-br from-emerald-100 to-teal-300" />
      </div>
    </PreviewFrame>
  );
}

export function ChangeContentPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse" },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Change Text Demo" })}
          >
            Change Text Demo
          </button>
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Hello World" })}
          >
            Hello World
          </button>
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Lorem Ipsum" })}
          >
            Lorem Ipsum
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Change Text Demo</h2>
      </div>
    </PreviewFrame>
  );
}

export function DirectClassUsagePreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const shine = new Shine(ref.current, {
      config: {
        shadowRGB: new Color(24, 41, 71),
      },
    });

    shine.enableMouseTracking();
    shine.enableAutoUpdates();

    return () => {
      shine.destroy();
    };
  }, []);

  return (
    <PreviewFrame>
      <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Class API Demo</h2>
    </PreviewFrame>
  );
}

const presets: Preset[] = [
  { label: "Black", rgb: { r: 0, g: 0, b: 0 } },
  { label: "White", rgb: { r: 255, g: 255, b: 255 } },
  { label: "Warm", rgb: { r: 120, g: 74, b: 36 } },
  { label: "Steel", rgb: { r: 36, g: 61, b: 91 } },
  { label: "Cyan", rgb: { r: 0, g: 163, b: 224 } },
];

function rgbToHex(rgb: { r: number; g: number; b: number }) {
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  };
}

export function ShadowRgbPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 36, g: 61, b: 91 });
  const hex = useMemo(() => rgbToHex(rgb), [rgb]);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: {
      shadowRGB: rgb,
      blur: 36,
      opacity: 0.2,
    },
  });

  const applyRgb = (next: { r: number; g: number; b: number }) => {
    setRgb(next);
    update({ config: { shadowRGB: next } });
  };

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {presets.map(preset => (
            <button
              key={preset.label}
              className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
              onClick={() => applyRgb(preset.rgb)}
            >
              {preset.label}
            </button>
          ))}
          <label className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium">
            Color
            <input
              type="color"
              value={hex}
              onChange={event => applyRgb(hexToRgb(event.target.value))}
              className="h-7 w-8 cursor-pointer border-0 bg-transparent p-0"
            />
          </label>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">shadowRGB Preview</h2>
      </div>
    </PreviewFrame>
  );
}

export function PlaygroundPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [content, setContent] = useState("Shine Playground");
  const [positionMode, setPositionMode] = useState<"followMouse" | "fixed">("followMouse");
  const [fixedX, setFixedX] = useState(420);
  const [fixedY, setFixedY] = useState(180);
  const [intensity, setIntensity] = useState(1);
  const [numSteps, setNumSteps] = useState(5);
  const [opacity, setOpacity] = useState(0.15);
  const [opacityPow, setOpacityPow] = useState(1.2);
  const [offset, setOffset] = useState(0.15);
  const [offsetPow, setOffsetPow] = useState(1.8);
  const [blur, setBlur] = useState(40);
  const [blurPow, setBlurPow] = useState(1);
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 0, g: 0, b: 0 });

  const { update } = useShine(ref, {
    content: "Shine Playground",
    light: { position: "followMouse", intensity: 1 },
    config: {
      numSteps: 5,
      opacity: 0.15,
      opacityPow: 1.2,
      offset: 0.15,
      offsetPow: 1.8,
      blur: 40,
      blurPow: 1,
      shadowRGB: { r: 0, g: 0, b: 0 },
    },
  });

  useEffect(() => {
    update({
      content,
      light: {
        position: positionMode === "followMouse" ? "followMouse" : { x: fixedX, y: fixedY },
        intensity,
      },
      config: {
        numSteps,
        opacity,
        opacityPow,
        offset,
        offsetPow,
        blur,
        blurPow,
        shadowRGB: rgb,
      },
    });
  }, [
    blur,
    blurPow,
    content,
    fixedX,
    fixedY,
    intensity,
    numSteps,
    offset,
    offsetPow,
    opacity,
    opacityPow,
    positionMode,
    rgb,
    update,
  ]);

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-5xl flex-col gap-5">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">Content</span>
            <input
              type="text"
              value={content}
              onChange={event => setContent(event.target.value)}
              className="rounded-md border bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">Light Position Mode</span>
            <select
              value={positionMode}
              onChange={event => setPositionMode(event.target.value as "followMouse" | "fixed")}
              className="rounded-md border bg-white px-3 py-2 text-sm"
            >
              <option value="followMouse">followMouse</option>
              <option value="fixed">fixed point</option>
            </select>
          </label>
        </div>

        {positionMode === "fixed" && (
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
              <span className="text-xs font-semibold text-slate-600">{`Fixed X: ${fixedX}`}</span>
              <input
                type="range"
                min={0}
                max={900}
                step={1}
                value={fixedX}
                onChange={event => setFixedX(Number(event.target.value))}
              />
            </label>
            <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
              <span className="text-xs font-semibold text-slate-600">{`Fixed Y: ${fixedY}`}</span>
              <input
                type="range"
                min={0}
                max={500}
                step={1}
                value={fixedY}
                onChange={event => setFixedY(Number(event.target.value))}
              />
            </label>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`Intensity: ${intensity.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.4}
              max={2.5}
              step={0.05}
              value={intensity}
              onChange={event => setIntensity(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`numSteps: ${numSteps}`}</span>
            <input
              type="range"
              min={2}
              max={12}
              step={1}
              value={numSteps}
              onChange={event => setNumSteps(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`Opacity: ${opacity.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.05}
              max={0.4}
              step={0.01}
              value={opacity}
              onChange={event => setOpacity(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`opacityPow: ${opacityPow.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.05}
              value={opacityPow}
              onChange={event => setOpacityPow(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`Offset: ${offset.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.05}
              max={0.4}
              step={0.01}
              value={offset}
              onChange={event => setOffset(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`offsetPow: ${offsetPow.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.05}
              value={offsetPow}
              onChange={event => setOffsetPow(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`Blur: ${blur}`}</span>
            <input
              type="range"
              min={8}
              max={72}
              step={1}
              value={blur}
              onChange={event => setBlur(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 rounded-lg border bg-white/80 p-3">
            <span className="text-xs font-semibold text-slate-600">{`blurPow: ${blurPow.toFixed(2)}`}</span>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.05}
              value={blurPow}
              onChange={event => setBlurPow(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-lg border bg-white/80 p-3">
          <span className="text-xs font-semibold text-slate-600">shadowRGB</span>
          <input
            type="color"
            value={rgbToHex(rgb)}
            onChange={event => setRgb(hexToRgb(event.target.value))}
            className="h-8 w-10 cursor-pointer border-0 bg-transparent p-0"
          />
          <span className="text-xs text-slate-600">{rgbToHex(rgb)}</span>
        </div>

        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">{content || "Shine Playground"}</h2>
      </div>
    </PreviewFrame>
  );
}

export function ReactUseShineGuidePreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [opacity, setOpacity] = useState(0.18);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { blur: 36, opacity },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => {
              const nextOpacity = Math.min(0.32, opacity + 0.04);
              setOpacity(nextOpacity);
              update({ config: { opacity: nextOpacity } });
            }}
          >
            Increase Opacity
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Adjust Me</h2>
      </div>
    </PreviewFrame>
  );
}

export function TextVsChildrenPreview() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useShine(textRef, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 } },
  });

  useShine(childrenRef, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 20 },
  });

  return (
    <PreviewFrame>
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Text target (textShadow)</p>
          <h3 ref={textRef} className="text-3xl font-black text-slate-200">Text Only</h3>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Children target (boxShadow)</p>
          <div ref={childrenRef} className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg bg-linear-to-br from-indigo-100 to-indigo-300" />
            <div className="h-16 rounded-lg bg-linear-to-br from-amber-100 to-orange-300" />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function DynamicUpdateContentPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 36, g: 61, b: 91 }, blur: 36, opacity: 0.2 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ content: "Hello World" })}
          >
            Update Content
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Live Updates</h2>
      </div>
    </PreviewFrame>
  );
}

export function DynamicUpdateConfigPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 36, g: 61, b: 91 }, blur: 36, opacity: 0.2 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ config: { blur: 48, opacity: 0.22, offset: 0.2 } })}
          >
            Update Config
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Live Updates</h2>
      </div>
    </PreviewFrame>
  );
}

export function DynamicUpdateLightPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 36, g: 61, b: 91 }, blur: 36, opacity: 0.2 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { intensity: 2, position: { x: 320, y: 140 } } })}
          >
            Update Light
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Live Updates</h2>
      </div>
    </PreviewFrame>
  );
}

export function DynamicUpdateColorPreview() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { update } = useShine(ref, {
    light: { position: "followMouse" },
    config: { shadowRGB: { r: 36, g: 61, b: 91 }, blur: 36, opacity: 0.2 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ config: { shadowRGB: { r: 26, g: 54, b: 93 } } })}
          >
            Update Color
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Live Updates</h2>
      </div>
    </PreviewFrame>
  );
}

export function LightPositionFollowMousePreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse", intensity: 1 },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 34 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { position: "followMouse" } })}
          >
            Follow Mouse
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Light Control</h2>
      </div>
    </PreviewFrame>
  );
}

export function LightPositionFixedPointPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse", intensity: 1 },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 34 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { position: { x: 480, y: 220 } } })}
          >
            Fixed Point
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Light Control</h2>
      </div>
    </PreviewFrame>
  );
}

export function LightIntensityPreview() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { update } = useShine(ref, {
    light: { position: "followMouse", intensity: 1 },
    config: { shadowRGB: { r: 0, g: 0, b: 0 }, blur: 34 },
  });

  return (
    <PreviewFrame>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-center">
          <button
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
            onClick={() => update({ light: { intensity: 1.5 } })}
          >
            Intensity 1.5
          </button>
        </div>
        <h2 ref={ref} className="text-center text-4xl font-black tracking-tight text-slate-200">Light Control</h2>
      </div>
    </PreviewFrame>
  );
}
