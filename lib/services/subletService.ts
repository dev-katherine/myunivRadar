import { sublets as seedSublets } from "@/lib/data/sublets";
import { getHousingById } from "@/lib/services/housingService";
import type { CampusId, SubletListing } from "@/lib/types";

// Same in-memory pattern as reviewService — mock persistence for the MVP.
const store: SubletListing[] = [...seedSublets];

// Sublets only ever apply to apartment housing. Filtering happens here so
// that guarantee lives in one place instead of being re-checked in every
// page that lists sublets.
export function getSubletsForCampus(campusId: CampusId): SubletListing[] {
  return store
    .filter((s) => {
      const home = getHousingById(s.housingId);
      return home?.campusId === campusId && home.type === "apartment";
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getSubletsByHousing(housingId: string): SubletListing[] {
  return store.filter((s) => s.housingId === housingId);
}

export type NewSubletInput = {
  housingId: string;
  availableFrom: string;
  availableUntil: string;
  price: number;
  roomType?: string;
  description: string;
  contact: string;
  userId?: string; // wired for a future authenticated user
};

export type SubletFieldErrors = Partial<
  Record<
    "housingId" | "availableFrom" | "availableUntil" | "price" | "description" | "contact",
    string
  >
>;

export function validateSublet(input: NewSubletInput): SubletFieldErrors {
  const errors: SubletFieldErrors = {};
  const home = getHousingById(input.housingId);

  if (!input.housingId) errors.housingId = "Select the apartment.";
  else if (!home || home.type !== "apartment")
    errors.housingId = "Sublets are only available for apartments.";

  if (!input.availableFrom) errors.availableFrom = "Choose a start date.";
  if (!input.availableUntil) errors.availableUntil = "Choose an end date.";
  if (
    input.availableFrom &&
    input.availableUntil &&
    input.availableFrom > input.availableUntil
  ) {
    errors.availableUntil = "End date must be after the start date.";
  }

  if (!input.price || input.price <= 0)
    errors.price = "Enter a monthly price greater than 0.";

  if (!input.description.trim()) errors.description = "Add a short description.";

  if (!input.contact.trim()) errors.contact = "Provide a way for students to reach you.";

  return errors;
}

export type SubmitSubletResult =
  | { success: true; listing: SubletListing }
  | { success: false; errors: SubletFieldErrors };

export async function submitSublet(
  input: NewSubletInput
): Promise<SubmitSubletResult> {
  const errors = validateSublet(input);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  await simulateLatency();

  const listing: SubletListing = {
    id: `sub-${Date.now()}`,
    housingId: input.housingId,
    availableFrom: input.availableFrom,
    availableUntil: input.availableUntil,
    price: input.price,
    roomType: input.roomType?.trim() || undefined,
    description: input.description.trim(),
    contact: input.contact.trim(),
    userId: input.userId,
    createdAt: new Date().toISOString(),
  };
  store.push(listing);
  return { success: true, listing };
}

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}
