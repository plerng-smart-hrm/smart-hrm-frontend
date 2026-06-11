import { CSSProperties } from "react";

export const colorVars = {
  "--leave-body":    "#b3ecff",
  "--leave-head":    "#99e0f7",
  "--normal-body":   "#fff34d",
  "--normal-head":   "#ffe924",
  "--overtime-body": "#33dd33",
  "--overtime-head": "#1fd11f",
  "--time-out-body": "#ffcc99",
  "--time-out-head": "#ffba80",
  "--food-body":     "#ccffcc",
  "--food-head":     "#b3f5b3",
  "--total-body":    "#ffe4b5",
  "--total-head":    "#ffd07a",
  "--payment-body":  "#ffffff",
  "--payment-head":  "#f1f3f6",
  "--ph-row":        "#eef2f7",
  "--grid-line":     "#000000",
  "--text-main":     "#1a1d21",
} as unknown as CSSProperties;

export const BD = "border [border-color:var(--grid-line)]";

export function num(v: unknown): number | null {
  if (v == null) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

export function fmtMoney(v: number | null | undefined, showZero = false): string {
  const n = num(v);
  if (n == null) return "";
  if (n === 0) return showZero ? "$0.00" : "";
  return `$${n.toFixed(2)}`;
}

export function fmtQty(v: number | null | undefined, suffix = ""): string {
  const n = num(v);
  if (n == null || n === 0) return "";
  return suffix ? `${n.toFixed(2)} ${suffix}` : n.toFixed(2);
}
