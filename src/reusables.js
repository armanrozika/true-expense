export function formatNumber(number) {
  return new Intl.NumberFormat("de-DE").format(number);
}
