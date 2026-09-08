import type { CampusId } from "@/lib/types";

// IGC listings are priced in Korean won, SLC listings in US dollars.
// This keeps currency formatting out of individual components.
export function formatPrice(price: number, campusId: CampusId): string {
  if (campusId === "igc") {
    return `₩${price.toLocaleString("en-US")}`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function formatDateRange(from: string, until: string): string {
  const fmt = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  return `${fmt(from)} – ${fmt(until)}`;
}
