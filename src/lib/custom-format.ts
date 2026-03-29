
export function formatToNumber(value: any, fallback: number = 0): number {
  if (value === undefined || value === null || value === "") return fallback;
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

export function formatToString(value: any, fallback: string = ""): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}
