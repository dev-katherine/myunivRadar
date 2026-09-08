import type { HousingType } from "@/lib/types";

// URL segments are plural ("dorms" / "apartments"); the data model uses
// the singular HousingType ("dorm" / "apartment"). Centralizing the
// mapping here keeps route params from leaking into the data layer.
const urlToType: Record<string, HousingType> = {
  dorms: "dorm",
  apartments: "apartment",
};

const typeToUrl: Record<HousingType, string> = {
  dorm: "dorms",
  apartment: "apartments",
};

export function isValidHousingTypeSlug(value: string): value is "dorms" | "apartments" {
  return value in urlToType;
}

export function slugToHousingType(slug: string): HousingType | undefined {
  return urlToType[slug];
}

export function housingTypeToSlug(type: HousingType): string {
  return typeToUrl[type];
}
