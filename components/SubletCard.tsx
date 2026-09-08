import type { CampusId, SubletListing } from "@/lib/types";
import { formatDateRange, formatPrice } from "@/lib/format";

export function SubletCard({
  listing,
  housingName,
  campusId,
  labels,
}: {
  listing: SubletListing;
  housingName: string;
  campusId: CampusId;
  labels: {
    available: string;
    priceLabel: string;
    perMonth: string;
    roomType: string;
    contact: string;
  };
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">{housingName}</h3>
        {listing.roomType && (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
            {listing.roomType}
          </span>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-xs text-muted">{labels.available}</dt>
          <dd className="text-foreground">
            {formatDateRange(listing.availableFrom, listing.availableUntil)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{labels.priceLabel}</dt>
          <dd className="font-medium text-foreground">
            {formatPrice(listing.price, campusId)} {labels.perMonth}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        {listing.description}
      </p>

      <p className="mt-3 border-t border-border pt-3 text-xs text-muted">
        {labels.contact}: <span className="text-foreground">{listing.contact}</span>
      </p>
    </article>
  );
}
