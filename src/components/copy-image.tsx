"use client";
import { MouseEvent } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

function updateStyle() {
  const versionRollout = document.querySelector(
    "#version-rollout",
  ) as HTMLElement | null;
  const figure = document.querySelector("figure");
  if (
    !versionRollout ||
    !figure ||
    versionRollout.scrollHeight <= versionRollout.clientHeight
  )
    return () => {};

  // update style to render full height image
  const lastOverflow = versionRollout.style.overflow;
  const lastMaxHeight = versionRollout.style.maxHeight;
  const lastFigureMaxHeight = figure.style.maxHeight;

  versionRollout.style.overflow = "visible";
  versionRollout.style.maxHeight = "none";
  figure.style.maxHeight = "none";
  return () => {
    versionRollout.style.overflow = lastOverflow;
    versionRollout.style.maxHeight = lastMaxHeight;
    figure.style.maxHeight = lastFigureMaxHeight;
  };
}

const copyImage = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  const div = document.querySelector("section");
  if (!div) return;

  const reset = updateStyle();

  toast.promise(
    toPng(div).then(async (dataUrl) => {
      const blob = await fetch(dataUrl).then((r) => r.blob());
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      reset();
    }),
    {
      loading: "Rendering image...",
      success: "Image copied to clipboard",
      error: (err) => err.message,
    },
  );
};

export function CopyImage() {
  return (
    <button
      className="absolute top-3 right-3 px-2 py-1 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hidden md:block"
      onClick={copyImage}
    >
      Copy Image
    </button>
  );
}
