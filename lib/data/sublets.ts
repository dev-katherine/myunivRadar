import type { SubletListing } from "@/lib/types";

// Sublet listings must always reference apartment housing — dorms never
// appear here. This is enforced by the service layer, not just by
// convention in this seed data.
export const sublets: SubletListing[] = [
  {
    id: "sub-1",
    housingId: "igc-apt-sky-garden",
    availableFrom: "2025-06-01",
    availableUntil: "2025-08-15",
    price: 700000,
    roomType: "Private Room",
    description:
      "Subletting my studio while I'm home for summer break. Fully furnished, close to Central Park station.",
    contact: "sky.garden.sublet@example.com",
    createdAt: "2025-04-01T00:00:00.000Z",
  },
  {
    id: "sub-2",
    housingId: "igc-apt-the-sharp",
    availableFrom: "2025-12-15",
    availableUntil: "2026-02-20",
    price: 850000,
    roomType: "Private Room",
    description:
      "Winter break sublet, one room in a two-bedroom unit. Roommate stays year-round.",
    contact: "kakaotalk: sharp_sublet25",
    createdAt: "2025-11-01T00:00:00.000Z",
  },
  {
    id: "sub-3",
    housingId: "slc-apt-cambridge-court",
    availableFrom: "2025-05-10",
    availableUntil: "2025-08-20",
    price: 650,
    roomType: "Shared Room",
    description:
      "Heading back to Songdo for the summer and looking for someone to take over my lease temporarily.",
    contact: "cambridge.sublet@example.com",
    createdAt: "2025-03-15T00:00:00.000Z",
  },
];
