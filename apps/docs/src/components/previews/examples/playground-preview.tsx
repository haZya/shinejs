"use client";

import { useEffect, useRef, useState } from "react";
import { useShine } from "shinejs/react";

import type { Rgb } from "@/components/previews/shared/color-utils";

import { hexToRgb, rgbToHex } from "@/components/previews/shared/color-utils";
import { PreviewFrame } from "@/components/previews/shared/preview-frame";

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
  const [rgb, setRgb] = useState<Rgb>({ r: 0, g: 0, b: 0 });

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
