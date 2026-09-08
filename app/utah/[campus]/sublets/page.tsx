"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { SubletCard } from "@/components/SubletCard";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingById } from "@/lib/services/housingService";
import { getSubletsForCampus } from "@/lib/services/subletService";

export default function SubletsPage() {
  return (
    <Suspense fallback={null}>
      <SubletsListing />
    </Suspense>
  );
}

function SubletsListing() {
  const params = useParams<{ campus: string }>();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  if (!isValidCampusId(params.campus)) {
    return (
      <Container className="py-14">
        <p className="text-muted">Unknown campus.</p>
      </Container>
    );
  }

  const campus = getCampusById(params.campus)!;
  const filterHousingId = searchParams.get("housingId");
  const allListings = getSubletsForCampus(campus.id);
  const listings = filterHousingId
    ? allListings.filter((l) => l.housingId === filterHousingId)
    : allListings;

  return (
    <Container className="py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">
            University of Utah · {campus.shortName}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("sublets.title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{t("sublets.subtitle")}</p>
        </div>
        <Link
          href={`/utah/${campus.id}/sublets/new`}
          className="inline-flex shrink-0 items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          {t("sublets.createCta")}
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="mt-8">
          <EmptyState title={t("sublets.empty")} body={t("sublets.emptyBody")} />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const home = getHousingById(listing.housingId);
            return (
              <SubletCard
                key={listing.id}
                listing={listing}
                housingName={home?.name ?? ""}
                campusId={campus.id}
                labels={{
                  available: t("sublets.available"),
                  priceLabel: t("sublets.priceLabel"),
                  perMonth: t("sublets.perMonth"),
                  roomType: t("sublets.roomType"),
                  contact: t("sublets.contact"),
                }}
              />
            );
          })}
        </div>
      )}
    </Container>
  );
}
