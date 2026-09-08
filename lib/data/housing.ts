import type { Housing } from "@/lib/types";

// Mock housing catalog. Every record belongs to a university, a campus,
// and a housing type — there is no such thing as "disconnected" housing.
// Housing names are treated as proper nouns and are not translated.
export const housing: Housing[] = [
  // --- Salt Lake City / Dorms ---
  {
    id: "slc-dorm-sage-point",
    universityId: "utah",
    campusId: "slc",
    name: "Sage Point",
    type: "dorm",
    address: "155 Sage Point Dr, Salt Lake City, UT",
    description:
      "Traditional first-year dorm with shared bathrooms and a large central dining hall nearby.",
  },
  {
    id: "slc-dorm-kahlert-village",
    universityId: "utah",
    campusId: "slc",
    name: "Kahlert Village",
    type: "dorm",
    address: "155 S Wolcott St, Salt Lake City, UT",
    description:
      "Suite-style dorm with shared common areas, popular with first-year international students.",
  },
  {
    id: "slc-dorm-chapel-glen",
    universityId: "utah",
    campusId: "slc",
    name: "Chapel Glen",
    type: "dorm",
    address: "1738 E South Campus Dr, Salt Lake City, UT",
    description:
      "Apartment-style dorm rooms with a kitchenette, a short walk from the business school.",
  },

  // --- Salt Lake City / Apartments ---
  {
    id: "slc-apt-cambridge-court",
    universityId: "utah",
    campusId: "slc",
    name: "Cambridge Court",
    type: "apartment",
    address: "1745 E Butler Ave, Salt Lake City, UT",
    description:
      "Off-campus apartment complex a short bus ride from campus, popular with upperclassmen.",
  },
  {
    id: "slc-apt-missio",
    universityId: "utah",
    campusId: "slc",
    name: "Missio Apartments",
    type: "apartment",
    address: "115 S 1400 E, Salt Lake City, UT",
    description: "Privately managed apartments close to Sunnyside Ave.",
  },
  {
    id: "slc-apt-university-village",
    universityId: "utah",
    campusId: "slc",
    name: "University Village",
    type: "apartment",
    address: "1810 S Foothill Dr, Salt Lake City, UT",
    description:
      "University-affiliated apartments for graduate students and students with families.",
  },

  // --- Incheon Global Campus / Dorms ---
  {
    id: "igc-dorm-central-residence",
    universityId: "utah",
    campusId: "igc",
    name: "IGC Central Residence Hall",
    type: "dorm",
    address: "119 Songdomunhwa-ro, Yeonsu-gu, Incheon",
    description:
      "Main IGC dormitory shared across partner universities, walking distance to classrooms.",
  },
  {
    id: "igc-dorm-global-house",
    universityId: "utah",
    campusId: "igc",
    name: "Global House Dorm",
    type: "dorm",
    address: "162 Songdomunhwa-ro, Yeonsu-gu, Incheon",
    description: "Two-person dorm rooms with a shared kitchen on each floor.",
  },
  {
    id: "igc-dorm-liv-songdo",
    universityId: "utah",
    campusId: "igc",
    name: "LivIn Songdo Dorm",
    type: "dorm",
    address: "160 Convensia-daero, Yeonsu-gu, Incheon",
    description: "Newer dorm building with single rooms and a study lounge.",
  },

  // --- Incheon Global Campus / Apartments ---
  {
    id: "igc-apt-sky-garden",
    universityId: "utah",
    campusId: "igc",
    name: "Sky Garden",
    type: "apartment",
    address: "43 Songdogukjedae-ro, Yeonsu-gu, Incheon",
    description:
      "Officetel-style apartments near Central Park, popular for subletting during breaks.",
  },
  {
    id: "igc-apt-the-sharp",
    universityId: "utah",
    campusId: "igc",
    name: "The Sharp Songdo",
    type: "apartment",
    address: "30 Convensia-daero, Yeonsu-gu, Incheon",
    description: "Modern high-rise apartments a short walk from Triple Street.",
  },
  {
    id: "igc-apt-compass-coop",
    universityId: "utah",
    campusId: "igc",
    name: "Compass Co-op",
    type: "apartment",
    address: "85 Songdomunhwa-ro, Yeonsu-gu, Incheon",
    description: "Shared apartment units aimed at exchange and Asia Campus students.",
  },
];
