"use server";
import { twMerge } from "tailwind-merge";

export type EmbedFrameProps = React.ComponentProps<"section"> & {
  children: React.ReactNode;
  iconFill?: boolean;
  isError?: boolean;
};

export const EmbedFrame: React.FC<EmbedFrameProps> = ({
  children,
  className,
  iconFill = false,
  isError = false,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        "relative rounded border shadow-md",
        isError
          ? "border-red-400 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50"
          : "bg-bgLight dark:border-gray-800 dark:bg-gray-900 dark:shadow-inner",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
