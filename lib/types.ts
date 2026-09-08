// Centralized data models for the MVP.
// There is no backend yet — these types describe the shape of the mock
// data in `lib/data/` and the values that flow through `lib/services/`.
// Keeping `userId` optional (rather than absent) on user-generated content
// means auth can be layered on later without changing these shapes.

export type University = {
  id: string;
  name: string;
  enabled: boolean;
};

export type CampusId = "slc" | "igc";

export type Campus = {
  id: CampusId;
  universityId: string;
  name: string;
  shortName: string;
};

export type HousingType = "dorm" | "apartment";

export type Housing = {
  id: string;
  universityId: string;
  campusId: CampusId;
  name: string;
  type: HousingType;
  address?: string;
  description?: string;
  image?: string;
};

export type Review = {
  id: string;
  housingId: string;
  rating: number; // 1-5, overall rating only
  title: string;
  body: string;
  semester?: string;
  userId?: string;
  createdAt: string;
};

export type SubletListing = {
  id: string;
  housingId: string; // must reference housing where type === "apartment"
  availableFrom: string;
  availableUntil: string;
  price: number;
  roomType?: string;
  description: string;
  contact: string;
  userId?: string;
  createdAt: string;
};
