I want you to build a small, clean MVP web application from scratch.

Do NOT assume there is an existing codebase or architecture to preserve.

The product is a housing review platform for students studying at Incheon Global Campus (IGC) in Songdo, South Korea.

The initial launch should focus on University of Utah students.

Other universities at Incheon Global Campus should appear in the product but remain unavailable for now.

The universities are:

* University of Utah
* Stony Brook University
* George Mason University
* Ghent University

Only University of Utah should be active in the first version.

The application should be intentionally small, simple, and easy to extend later.

---

# 1. Product Background

Students at Incheon Global Campus often move between their university's main campus and the Songdo campus.

For University of Utah students, this means moving between:

* University of Utah Salt Lake City campus
* University of Utah Asia Campus / Incheon Global Campus in Songdo

Because the campuses are extremely far apart, students preparing to relocate often have very limited firsthand information about housing.

They may want to know:

* what a dorm or apartment is actually like
* whether management is good or bad
* how convenient the location is
* whether the building is noisy
* whether the housing is worth the price
* what previous students experienced

The main purpose of this website is:

> Help students make better housing decisions by sharing housing reviews written by other students who have actually lived there.

This is the core product.

---

# 2. Product Priorities

There are two main features.

## Priority 1 — Housing Reviews

This is the main feature and should visually and structurally dominate the application.

Students should be able to:

* choose their university
* choose their campus
* browse housing
* choose Dorms or Apartments
* open a housing detail page
* read reviews
* write a review

Reviews should always feel like the primary purpose of the site.

---

## Priority 2 — Sublets

Students sometimes return home during school breaks and temporarily leave their apartments unused.

Some students sublet their apartments to other students during these periods.

The application should therefore also include a lightweight Sublet Listing feature.

Sublets are secondary.

Do NOT turn this into a full marketplace.

For the MVP, users should be able to:

* browse sublet listings
* create a sublet listing
* view basic listing details

Sublets should only be available for Apartments.

Dorms must never support sublet listings.

Do NOT implement:

* payments
* booking
* escrow
* contracts
* complex chat
* tenant ratings
* marketplace recommendation systems

Think of Sublets as a simple student housing bulletin board.

---

# 3. Technology

Build the project using:

* Next.js
* React
* TypeScript
* Tailwind CSS

Use the modern Next.js App Router.

Keep external dependencies minimal.

Do not install libraries unless they provide clear value.

Do not introduce unnecessary global state management.

---

# 4. Home Page — University Selection

The first page should ask users to choose their university.

Display:

* University of Utah
* Stony Brook University
* George Mason University
* Ghent University

University of Utah should be enabled.

The other three universities should visually appear but should be disabled or show a Coming Soon state.

When users select them, show:

English:

"Coming soon. Housing information for this university is not available yet."

Korean:

"곧 지원될 예정입니다. 아직 해당 학교의 주거 정보는 제공되지 않습니다."

Do not create functional housing flows for those universities yet.

The data structure should still make it easy to activate them later.

---

# 5. University of Utah — Campus Selection

After selecting University of Utah, users should choose between:

* Salt Lake City
* Incheon Global Campus / Utah Asia Campus

Use short labels where appropriate:

* SLC
* IGC

Do NOT immediately send users directly into Housing.

Instead, selecting a campus should open a small Campus Hub page.

Example:

University of Utah
→ Select Campus
→ Campus Hub

---

# 6. Campus Hub

Each campus should have its own simple hub page.

For example:

University of Utah
Salt Lake City

or

University of Utah
Incheon Global Campus

The main actions should be:

Primary:

* Explore Housing
* Write a Review

Secondary:

* Browse Sublets

The hierarchy should be visually obvious.

Housing Reviews are the main product.

Sublets should be present but visually less prominent.

Do not overload the Campus Hub with unnecessary widgets or dashboard elements.

---

# 7. Housing Categories

Inside Housing, users should choose between:

* Dorms
* Apartments

The core flow should be:

University
→ Campus
→ Housing
→ Dorms / Apartments
→ Housing List
→ Housing Detail
→ Reviews

Housing records should always belong to:

* a university
* a campus
* a housing type

Do not create disconnected housing data.

---

# 8. Housing List

The Housing List page should display clean housing cards.

Each card can include:

* Housing name
* Dorm or Apartment
* Campus
* Average rating
* Number of reviews
* Short location information
* Optional thumbnail or image placeholder

Keep cards concise.

Do not overload them with excessive metadata.

Clicking a card should open the Housing Detail page.

---

# 9. Housing Detail

Housing Detail pages should be strongly review-focused.

Show approximately:

* Housing name
* Campus
* Housing type
* Overall rating
* Number of reviews
* Address or location
* Short description
* Student reviews

Reviews are the main content of the page.

For Apartment pages only, provide a secondary action such as:

"View Sublets"

Do not visually prioritize Sublets over Reviews.

Dorm pages must not expose sublet functionality.

---

# 10. Review Structure

Keep reviews simple.

Each review should contain:

* Overall Rating
* Review Title
* Review Text
* Optional semester or year lived there

Do NOT implement detailed rating categories.

Do NOT add separate scores for:

* cleanliness
* management
* noise
* amenities
* safety
* value

One overall rating is enough for the MVP.

---

# 11. Write a Review

Write a Review should be accessible directly from each Campus Hub.

The campus should already be known from the route.

Example:

/utah/igc/write-review

Therefore, do not force the user to select the campus again unless technically necessary.

The form should contain:

Housing:
[ Select Housing ]

Overall Rating:
[ ★★★★★ ]

Review Title:
[ input ]

Review:
[ textarea ]

Optional:

* Semester / Year lived there

The Housing dropdown must dynamically show housing belonging to the current campus.

Do NOT hard-code any specific housing property.

The Housing dropdown must use centralized housing data.

Dorms and Apartments can both appear in the review form.

---

# 12. Sublet Browsing

Create a simple Sublets section for each campus.

Only Apartment housing can have Sublet listings.

Each listing can contain:

* Apartment Name
* Available From
* Available Until
* Price
* Room Type
* Short Description
* Contact Method

Example:

Apartment:
Sky Garden

Available:
June 1 – August 15

Price:
₩700,000 / month

Room Type:
Private Room

Description:
Short listing text

Contact:
Email or external contact information

Keep the listing design simple.

---

# 13. Create Sublet Listing

Create a simple form containing:

* Apartment
* Available From
* Available Until
* Price
* Room Type
* Description
* Contact Information

The campus should already be known from the route.

The Apartment dropdown should only include housing where:

type === "apartment"

Dorms must never appear in this dropdown.

Do not implement booking or payment.

---

# 14. Suggested Routing

Use URL-driven navigation.

A route structure similar to this is appropriate:

```text
/
  University selection

/utah
  University of Utah campus selection

/utah/slc
  SLC Campus Hub

/utah/igc
  IGC Campus Hub

/utah/slc/housing
/utah/igc/housing

/utah/slc/housing/dorms
/utah/slc/housing/apartments

/utah/igc/housing/dorms
/utah/igc/housing/apartments

/utah/slc/housing/[housingId]
/utah/igc/housing/[housingId]

/utah/slc/write-review
/utah/igc/write-review

/utah/slc/sublets
/utah/igc/sublets

/utah/slc/sublets/new
/utah/igc/sublets/new
```

You may simplify this if you identify a cleaner structure.

Avoid unnecessary nesting or routing abstractions.

The hierarchy should remain:

University
→ Campus
→ Feature

---

# 15. English and Korean

Every visible page must support:

* English
* Korean

Include a global language switcher such as:

EN | 한국어

Do not create duplicate pages for each language.

All reusable UI strings should come from centralized translation resources.

For example:

```ts
const translations = {
  en: {
    ...
  },
  ko: {
    ...
  }
}
```

or use a lightweight i18n solution if appropriate.

Avoid scattered hard-coded English strings inside UI components.

Housing names do not need translation.

---

# 16. Data Architecture

There is no backend yet.

Use static TypeScript data or JSON for the MVP.

Keep all core data centralized.

Do NOT store large arrays directly inside page components.

Use simple models similar to:

```ts
type University = {
  id: string
  name: string
  enabled: boolean
}

type Campus = {
  id: string
  universityId: string
  name: string
  shortName: string
}

type Housing = {
  id: string
  universityId: string
  campusId: string
  name: string
  type: "dorm" | "apartment"
  address?: string
  description?: string
}

type Review = {
  id: string
  housingId: string
  rating: number
  title: string
  body: string
  semester?: string
  userId?: string
}

type SubletListing = {
  id: string
  housingId: string
  availableFrom: string
  availableUntil: string
  price: number
  roomType?: string
  description: string
  contact: string
  userId?: string
}
```

The exact types can be adjusted.

The important relationships are:

University
→ Campus
→ Housing
→ Reviews

and:

Apartment Housing
→ Sublet Listings

---

# 17. Data Access / Service Layer

Keep UI components separate from storage logic.

Create a very small data-access or service layer.

For example:

```text
lib/
  housing.ts
  reviews.ts
  sublets.ts
```

or:

```text
services/
  housingService.ts
  reviewService.ts
  subletService.ts
```

The UI should call these functions rather than directly depending on where data is stored.

Do not over-engineer this layer.

The purpose is simply to make it easy to replace mock data with a real database later.

---

# 18. Authentication

Do NOT implement authentication now.

Do NOT add:

* Supabase Auth
* Clerk
* Firebase Auth
* Auth.js

However, authentication will be added later.

Structure the code so adding authentication will not require rewriting the application.

Reviews and Sublet Listings should already be compatible with a future:

userId

field.

Submission logic should remain separate from UI components.

For example:

```text
ReviewForm
    ↓
review service
    ↓
mock implementation now
    ↓
database/API implementation later
```

Use the same approach for Sublet Listings.

Do not deeply couple user-created content to anonymous browser state.

---

# 19. Review and Sublet Submission

Because there is currently no backend, submissions do not need real persistence.

For the MVP:

* validate the forms
* provide a realistic successful submission flow
* use mock submission behavior if necessary
* clearly isolate submission logic

Do not pretend that data is permanently saved if it is not.

The code should make it easy to replace mock submission with a database/API later.

---

# 20. UI Direction

The UI should be:

* modern
* clean
* minimal
* polished
* student-focused
* easy to scan

It should feel like a useful campus product rather than an enterprise dashboard.

Prioritize:

* strong information hierarchy
* clean typography
* generous but controlled spacing
* simple card layouts
* subtle borders
* consistent border radius
* restrained shadows
* clear call-to-action hierarchy
* readable forms
* concise navigation

Use a restrained visual system.

Avoid:

* excessive gradients
* glassmorphism everywhere
* flashy animation
* overly colorful UI
* cluttered dashboards
* giant marketing hero sections
* excessive icons
* decorative elements with no functional purpose

The UI should look current and intentionally designed, but not visually noisy.

A neutral base with one restrained accent color is appropriate.

Use modern sans-serif typography.

Reviews should visually dominate Housing Detail pages.

Sublets should clearly feel secondary.

---

# 21. Desktop-First Responsive Design

The website does NOT need to be mobile-first.

Prioritize a clean desktop and laptop experience.

The primary target is students using the site in a normal browser window.

However, the site should still be reasonably responsive.

Requirements:

* Desktop/laptop is the primary design target
* Make good use of horizontal space on larger screens
* Use sensible max-width containers
* Cards can use multi-column layouts on desktop
* Forms should not stretch unnecessarily wide
* Navigation should remain simple and readable

On smaller screens:

* layouts should stack cleanly
* cards should remain readable
* forms should remain usable
* navigation should not break
* avoid horizontal overflow

Do not spend excessive development effort on mobile-specific UX.

Do not create separate mobile-only components or user flows unless clearly necessary.

Priority order:

1. Correct functionality
2. Clean desktop experience
3. Simple architecture
4. Reasonable responsive behavior

---

# 22. Navigation

Keep navigation simple.

The site should not feel like a dashboard.

A global header can contain approximately:

* Logo / Product Name
* Housing
* Write a Review
* Sublets
* Language Switcher

Navigation should respect the currently selected university/campus where relevant.

Do not add unnecessary menu items.

---

# 23. Reusable Components

Prefer a small set of reusable components such as:

* Header
* UniversityCard
* CampusCard
* HousingCard
* RatingDisplay
* ReviewCard
* SubletCard
* Select
* FormField
* EmptyState
* ComingSoonState

Do not create dozens of micro-components without a clear reason.

Prefer readable components over excessive abstraction.

---

# 24. Scope Control

This is an MVP.

Do NOT build:

* authentication
* user profiles
* social feeds
* followers
* comments on reviews
* direct messaging
* payments
* booking
* maps
* advanced search
* recommendation algorithms
* AI features
* admin dashboards
* notifications
* favorites
* complex moderation tools
* detailed rating systems

Do not add features simply because they might be useful later.

Keep the scope narrow.

---

# 25. Build Strategy

Before coding, briefly propose:

1. Route structure
2. Folder structure
3. Data models
4. Main reusable components
5. Data access strategy
6. How authentication can be added later

Keep this proposal concise.

Then proceed with implementation.

Do not stop after describing the architecture.

Actually create the project files and implement the application.

---

# 26. Required Pages and Features

Implement the following:

## Home

* University selection
* University of Utah enabled
* Other universities show Coming Soon

## Utah

* SLC / IGC campus selection

## Campus Hub

* Explore Housing
* Write a Review
* Browse Sublets as secondary action

## Housing

* Dorm / Apartment selection
* Housing List
* Housing Detail

## Reviews

* Review list
* Write Review form
* Housing dropdown
* Overall rating
* Review title
* Review text
* Optional semester/year

## Sublets

* Browse listings
* Apartment-only listings
* Create Sublet form
* Apartment-only dropdown

## Language

* Global English / Korean switch

---

# 27. Verification

After implementation, run:

* TypeScript type check
* ESLint
* production build

Fix all errors caused by the implementation.

Then manually verify:

1. Home → University of Utah
2. Home → Stony Brook → Coming Soon
3. Home → George Mason → Coming Soon
4. Home → Ghent → Coming Soon
5. Utah → SLC
6. Utah → IGC
7. SLC Campus Hub loads correctly
8. IGC Campus Hub loads correctly
9. Campus Hub → Housing
10. Housing → Dorms
11. Housing → Apartments
12. Housing card → Housing Detail
13. Housing Detail → Reviews
14. Campus Hub → Write a Review
15. Review housing dropdown contains only housing from the current campus
16. Review submission validates correctly
17. Campus Hub → Sublets
18. Sublet listings only reference Apartments
19. Dorm pages do not expose Sublets
20. Create Sublet dropdown only contains Apartments
21. English → Korean
22. Korean → English
23. Desktop layout is polished and readable
24. Smaller-screen layout does not break

---

# 28. Final Report

After completing the implementation, give me a concise report containing:

* project structure
* routes created
* main reusable components
* data models
* mock data strategy
* review submission behavior
* sublet submission behavior
* how a real database can replace mock data
* how authentication should plug in later
* remaining MVP limitations

Do not add extra features beyond the requested scope.

When deciding between:

"more sophisticated but complicated"

and:

"simple, clean, and easy to extend"

choose simple, clean, and easy to extend.

