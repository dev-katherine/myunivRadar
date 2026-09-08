import { housing } from "@/lib/data/housing";
import type { CampusId, Housing, HousingType } from "@/lib/types";

export function getHousingByCampus(
  campusId: CampusId,
  type?: HousingType
): Housing[] {
  return housing.filter(
    (h) => h.campusId === campusId && (type ? h.type === type : true)
  );
}

export function getHousingById(id: string): Housing | undefined {
  return housing.find((h) => h.id === id);
}
