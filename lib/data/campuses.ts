import type { Campus } from "@/lib/types";

// Only University of Utah has active campuses in this MVP. Other
// universities will get their own campus rows here once they launch.
export const campuses: Campus[] = [
  { id: "slc", universityId: "utah", name: "Salt Lake City", shortName: "SLC" },
  {
    id: "igc",
    universityId: "utah",
    name: "Incheon Global Campus",
    shortName: "IGC",
  },
];
