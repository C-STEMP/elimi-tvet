export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function parseNaira(val: string): number {
  const clean = val.replace(/[^0-9]/g, "");
  return parseInt(clean, 10) || 0;
}
