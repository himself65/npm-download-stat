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
