import type { Review } from "@/lib/types";
import { RatingDisplay } from "@/components/RatingDisplay";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">{review.title}</h3>
        <RatingDisplay rating={review.rating} size="sm" />
      </div>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
        {review.body}
      </p>
      {review.semester && (
        <p className="mt-3 text-xs font-medium text-muted">{review.semester}</p>
      )}
    </article>
  );
}
