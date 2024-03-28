"use client";
import { atomWithStorage } from "jotai/utils";
import React, { useState } from "react";
import type { NpmPackageStatsData } from "@/lib/fetch-npm";
import { twMerge } from "tailwind-merge";
import { useAtom } from "jotai/react";

const enum PackageManagerName {
  Npm = "npm",
  Yarn = "yarn",
  Pnpm = "pnpm",
}

const packageManagerNames = [
  PackageManagerName.Npm,
  PackageManagerName.Yarn,
  PackageManagerName.Pnpm,
] as const;

const packageManagerPreference = atomWithStorage(
  "packageManagerPreference",
  PackageManagerName.Pnpm,
);

type PackageManagerProps = InstallCommandProps & {
  className?: string;
  packageManager: "npm" | "yarn" | "pnpm";
};

const PackageManager: React.FC<PackageManagerProps> = ({
  className,
  npm,
  accent,
  packageManager,
}) => (
  <>
    <span className={twMerge(className, "select-none text-red-500/75")}>
      ${" "}
    </span>
    {packageManager} {packageManager === "npm" ? "install" : "add"}{" "}
    <a href={npm.url} className={accent}>
      {npm.packageName}
    </a>
  </>
);

export type InstallCommandProps = {
  npm: Pick<NpmPackageStatsData, "url" | "packageName">;
  accent: string;
};

export const InstallCommand: React.FC<InstallCommandProps> = ({
  npm,
  accent,
}) => {
  const [preferPm, setPreferPm] = useAtom(packageManagerPreference);
  const [open, setOpen] = useState(false);
  return (
    <details
      {...(open ? { open: true } : {})}
      className="text-gray-500"
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
    >
      <summary>
        <PackageManager npm={npm} accent={accent} packageManager={preferPm} />
      </summary>
      {packageManagerNames
        .filter((pm) => pm !== preferPm)
        .map((pm) => (
          <div key={pm} onClick={() => setPreferPm(pm)}>
            <PackageManager
              className="ml-3"
              npm={npm}
              accent={accent}
              packageManager={pm}
            />
          </div>
        ))}
    </details>
  );
};
