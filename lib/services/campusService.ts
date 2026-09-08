import { campuses } from "@/lib/data/campuses";
import type { Campus, CampusId } from "@/lib/types";

export function getCampusesByUniversity(universityId: string): Campus[] {
  return campuses.filter((c) => c.universityId === universityId);
}

export function getCampusById(campusId: string): Campus | undefined {
  return campuses.find((c) => c.id === campusId);
}

export function isValidCampusId(value: string): value is CampusId {
  return campuses.some((c) => c.id === value);
}
