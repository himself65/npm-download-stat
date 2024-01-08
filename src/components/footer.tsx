import { memo } from "react";

export const Footer = memo(function Footer() {
  return (
    <footer
      role="presentation"
      className="absolute bottom-3 left-3 flex items-center gap-1 text-sm text-gray-500 overflow-auto flex-wrap"
    >
      <span>idea inspired by </span>
      <a
        href="https://francoisbest.com"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        47ng
      </a>
      <span className="text-gray-500/80">•</span>
      <span>built by </span>
      <a
        href="https://github.com/himself65"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        himself65
      </a>
      <span className="text-gray-500/80">•</span>
      <span>source code on </span>
      <a
        href="https://github.com/himself65/npm-download-stat"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        GitHub
      </a>
      <span className="text-gray-500/80">•</span>
      <span>licensed under</span>
      <span className="font-bold">MIT</span>
      <span className="text-gray-500/80">•</span>
      <span>
        available search params: <code>?count=number</code>,{" "}
        <code>?sort=semver</code>
      </span>
    </footer>
  );
});
