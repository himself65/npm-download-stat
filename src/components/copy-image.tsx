"use client";
import { toPng } from "html-to-image";
export function CopyImage() {
  const copyImage = async () => {
    const div = document.querySelector("section");
    if (!div) return;
    const dataUrl = await toPng(div);
    const blob = await fetch(dataUrl).then((r) => r.blob());
    const item = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([item]);
  };
  return (
    <button
      className="absolute top-3 right-3 px-2 py-1 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      onClick={copyImage}
    >
      Copy Image
    </button>
  );
}
