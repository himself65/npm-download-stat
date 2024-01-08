"use client";
import { MouseEvent } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

const copyImage = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  const div = document.querySelector("section");
  if (!div) return;
  toPng(div).then(async (dataUrl) => {
    const blob = await fetch(dataUrl).then((r) => r.blob());
    const item = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([item]);
  });
  toast.success("Image copied to clipboard");
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
