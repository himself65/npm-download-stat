import { getPkgInfo } from "@/lib/fetch-npm";

const LOCALE = "en-US";
const numberFormat = Intl.NumberFormat(LOCALE);

export function formatNumber(value: number) {
  return numberFormat.format(value);
}

export function formatStatNumber(
  number: number,
  options: Intl.NumberFormatOptions = {},
): string {
  return number.toLocaleString(LOCALE, {
    notation: "compact",
    unitDisplay: "short",
    ...options,
  });
}

export function matchGithubRepo(
  info: Awaited<ReturnType<typeof getPkgInfo>>,
): string {
  const maybeLink = info.repository?.url || info.homepage;
  if (!maybeLink) {
    throw new Error(`Cannot find repository or homepage for ${info.name}`);
  }
  {
    const regex = /git(?:\+https)?:\/\/github\.com\/(.*)\.git/;
    const match = maybeLink.match(regex);
    if (match) {
      return match[1];
    }
  }
  {
    const regex = /https:\/\/github\.com\/(.*)/;
    const match = maybeLink.match(regex);
    if (match) {
      return match[1];
    }
  }
  throw new Error(`Cannot find github repo for ${info.name}`);
}

// we cannot automatically detect the accent color for every package.
export const textAccentMap = {
  vue: "text-green-500",
  react: "text-blue-500",
  angular: "text-red-500",
  svelte: "text-orange-500",
  ember: "text-red-500",
  backbone: "text-blue-500",
  jquery: "text-blue-500",
  preact: "text-blue-500",
  rspack: "text-[#d97706]",
  vite: "text-[#add467]",
  vitest: "text-[#add467]",
};
