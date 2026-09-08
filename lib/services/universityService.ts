import { universities } from "@/lib/data/universities";
import type { University } from "@/lib/types";

// Thin read layer over the mock university data. Swapping this for a
// database call later means changing only this file.
export function getUniversities(): University[] {
  return universities;
}

export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}
