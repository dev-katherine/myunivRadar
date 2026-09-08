import Link from "next/link";
import type { Housing } from "@/lib/types";
import { RatingDisplay } from "@/components/RatingDisplay";

export function HousingCard({
  housing,
  href,
  typeLabel,
  campusLabel,
  avgRating,
  reviewCount,
  noRatingLabel,
}: {
  housing: Housing;
  href: string;
  typeLabel: string;
  campusLabel: string;
  avgRating: number;
  reviewCount: number;
  noRatingLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent hover:shadow-sm"
    >
      <div className="flex h-24 items-center justify-center bg-accent-soft text-2xl font-semibold text-accent">
        {housing.name
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug text-foreground group-hover:text-accent">
            {housing.name}
          </h3>
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
            {typeLabel}
          </span>
        </div>
        <p className="text-xs text-muted">{campusLabel}</p>
        {housing.address && (
          <p className="line-clamp-1 text-xs text-muted">{housing.address}</p>
        )}
        <div className="mt-auto pt-2">
          <RatingDisplay
            rating={avgRating}
            reviewCount={reviewCount}
            noRatingLabel={noRatingLabel}
          />
        </div>
      </div>
    </Link>
  );
}
