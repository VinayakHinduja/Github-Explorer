export const FormatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}
