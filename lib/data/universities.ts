import type { University } from "@/lib/types";

// Every IGC university appears on the home page. Only `enabled: true`
// universities have working housing flows — the rest render in a
// "Coming Soon" state so activating them later is just a data change.
export const universities: University[] = [
  { id: "utah", name: "University of Utah", enabled: true },
  { id: "stonybrook", name: "Stony Brook University", enabled: false },
  { id: "georgemason", name: "George Mason University", enabled: false },
  { id: "ghent", name: "Ghent University", enabled: false },
];
