import { reviews as seedReviews } from "@/lib/data/reviews";
import type { Review } from "@/lib/types";

// In-memory store seeded from the mock data. This simulates a real
// submission flow for the MVP, but it is NOT persistence: it lives only
// in this server process's memory and resets on restart/redeploy.
// Replacing this module's internals with real database calls is the
// only change needed once a backend exists — callers (server actions,
// pages) do not need to change.
const store: Review[] = [...seedReviews];

export function getReviewsByHousing(housingId: string): Review[] {
  return store
    .filter((r) => r.housingId === housingId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getAverageRating(housingId: string): number {
  const list = getReviewsByHousing(housingId);
  if (list.length === 0) return 0;
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / list.length) * 10) / 10;
}

export type NewReviewInput = {
  housingId: string;
  rating: number;
  title: string;
  body: string;
  semester?: string;
  userId?: string; // wired for a future authenticated user
};

export type ReviewFieldErrors = Partial<
  Record<"housingId" | "rating" | "title" | "body", string>
>;

export function validateReview(input: NewReviewInput): ReviewFieldErrors {
  const errors: ReviewFieldErrors = {};
  if (!input.housingId) errors.housingId = "Select which housing this review is for.";
  if (!input.rating || input.rating < 1 || input.rating > 5)
    errors.rating = "Choose an overall rating from 1 to 5.";
  if (!input.title.trim()) errors.title = "Give your review a short title.";
  else if (input.title.trim().length > 80) errors.title = "Title is too long.";
  if (!input.body.trim()) errors.body = "Share a bit about your experience.";
  else if (input.body.trim().length < 10)
    errors.body = "Review text is too short — add a bit more detail.";
  return errors;
}

export type SubmitReviewResult =
  | { success: true; review: Review }
  | { success: false; errors: ReviewFieldErrors };

// Mock "submission" — validates, then writes to the in-memory store.
// A future implementation swaps the body of this function for a
// database insert or API call; the signature can stay the same.
export async function submitReview(
  input: NewReviewInput
): Promise<SubmitReviewResult> {
  const errors = validateReview(input);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  await simulateLatency();

  const review: Review = {
    id: `rev-${Date.now()}`,
    housingId: input.housingId,
    rating: input.rating,
    title: input.title.trim(),
    body: input.body.trim(),
    semester: input.semester?.trim() || undefined,
    userId: input.userId,
    createdAt: new Date().toISOString(),
  };
  store.push(review);
  return { success: true, review };
}

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}
