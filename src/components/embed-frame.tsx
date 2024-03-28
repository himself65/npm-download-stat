"use server";
import { twMerge } from "tailwind-merge";
import React from "react";

export type EmbedFrameProps = React.ComponentProps<"section"> & {
  children: React.ReactNode;
  iconFill?: boolean;
};

export const EmbedFrame: React.FC<EmbedFrameProps> = ({
  children,
  className,
  iconFill = false,
  ...props
}) => {
  return (
    <section
      id="embed-frame"
      className={twMerge(
        "relative rounded border shadow-md",
        "bg-bgLight dark:border-gray-800 dark:bg-gray-900 dark:shadow-inner",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
