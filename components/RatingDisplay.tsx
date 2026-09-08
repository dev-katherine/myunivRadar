const STAR = "★";

export function RatingDisplay({
  rating,
  reviewCount,
  noRatingLabel,
  size = "md",
}: {
  rating: number;
  reviewCount?: number;
  noRatingLabel?: string;
  size?: "sm" | "md" | "lg";
}) {
  const textSize = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";
  const starSize = size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  if (!rating && reviewCount === 0 && noRatingLabel) {
    return <span className={`${textSize} text-muted`}>{noRatingLabel}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${textSize}`}>
      <span className={`${starSize} tracking-tight text-amber-500`} aria-hidden>
        {STAR}
      </span>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-muted">({reviewCount})</span>
      )}
    </span>
  );
}
