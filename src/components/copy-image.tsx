"use client";
import { MouseEvent } from "react";
import { toBlob } from "html-to-image";
import { toast } from "sonner";

function updateStyle() {
  const versionRollout = document.querySelector(
    "#version-rollout"
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
  const div = document.querySelector("#embed-frame") as HTMLElement | null;
  if (!div) return;

  const reset = updateStyle();

  //Firefox does not support copying images to clipboard
  if (typeof ClipboardItem !== "undefined") {
    toast.promise(
      toBlob(div).then(async (blob) => {
        if (!blob) throw new Error("Failed to convert html to blob");
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);

        reset();
      }),
      {
        loading: "Rendering image...",
        success: "Image copied to clipboard",
        error: (err) => err.message,
      }
    );
  } else {
    let xpath = "//details//div";
    let matchingElements = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    //removing yarn and npm entries as in the downloaded image they overlap with other content
    for (let i = 0; i < matchingElements.snapshotLength; i++) {
      let element = matchingElements.snapshotItem(i);
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
    toast.promise(
      toBlob(div).then(async (blob) => {
        if (!blob) throw new Error("Failed to convert html to blob");
        let tempElem = document.createElement("a");
        tempElem.href = URL.createObjectURL(blob);
        tempElem.download = "image.png";
        document.body.appendChild(tempElem);
        tempElem.click();
        document.body.removeChild(tempElem);
        reset();
      }),
      {
        loading: "Rendering image...",
        success:
          "Image downloaded, copying to clipboard is not supported in your browser",
        error: (err) => err.message,
      }
    );
  }
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
