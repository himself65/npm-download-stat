"use client";

import React from "react";
import { GradientPicker, GradientPickerProps } from "@/components/color-picker";

export type AccentSelectProps = Pick<
  GradientPickerProps,
  "background" | "setBackground"
>;

export const AccentSelect: React.FC<AccentSelectProps> = (props) => {
  return <GradientPicker {...props} />;
};
