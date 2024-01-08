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


// we cannot automatically detect the accent color for every package.
export const textAccentMap = {
  vue: 'text-green-500',
  react: 'text-blue-500',
  angular: 'text-red-500',
  svelte: 'text-orange-500',
  ember: 'text-red-500',
  backbone: 'text-blue-500',
  jquery: 'text-blue-500',
  preact: 'text-blue-500',
  rspack: 'text-[#d97706]',
  vite: 'text-[#add467]',
  vitest: 'text-[#add467]'
}
