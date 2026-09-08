"use client";

import { useState } from "react";

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div
      role="radiogroup"
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onClick={() => onChange(star)}
          className="p-0.5 text-2xl leading-none transition-transform hover:scale-110"
        >
          <span className={star <= display ? "text-amber-500" : "text-border"}>★</span>
        </button>
      ))}
    </div>
  );
}
