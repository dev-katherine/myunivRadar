"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import { RatingDisplay } from "@/components/RatingDisplay";
import { ReviewCard } from "@/components/ReviewCard";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingById } from "@/lib/services/housingService";
import { getAverageRating, getReviewsByHousing } from "@/lib/services/reviewService";
import { isValidHousingTypeSlug, slugToHousingType } from "@/lib/housingType";

export default function HousingDetailPage() {
  const params = useParams<{ campus: string; type: string; housingId: string }>();
  const { t } = useTranslation();

  if (!isValidCampusId(params.campus) || !isValidHousingTypeSlug(params.type)) {
    return (
      <Container className="py-14">
        <p className="text-muted">Not found.</p>
      </Container>
    );
  }

  const campus = getCampusById(params.campus)!;
  const type = slugToHousingType(params.type)!;
  const home = getHousingById(params.housingId);

  if (!home || home.campusId !== campus.id || home.type !== type) {
    return (
      <Container className="py-14">
        <p className="text-muted">Housing not found.</p>
      </Container>
    );
  }

  const reviewList = getReviewsByHousing(home.id);
  const avgRating = getAverageRating(home.id);
  const typeLabel = t(type === "dorm" ? "housing.dorms" : "housing.apartments");
  const base = `/utah/${campus.id}`;

  return (
    <Container className="py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName} · {typeLabel}
      </p>
      <div className="mt-1 flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {home.name}
        </h1>
        <RatingDisplay
          rating={avgRating}
          reviewCount={reviewList.length}
          noRatingLabel={t("housing.noRatingYet")}
          size="lg"
        />
      </div>

      {home.address && <p className="mt-2 text-sm text-muted">{home.address}</p>}
      {home.description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
          {home.description}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`${base}/write-review?housingId=${home.id}`}
          className="inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          {t("housingDetail.writeReviewCta")}
        </Link>
        {home.type === "apartment" && (
          <Link
            href={`${base}/sublets?housingId=${home.id}`}
            className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-foreground/30"
          >
            {t("housingDetail.viewSublets")}
          </Link>
        )}
      </div>

      <h2 className="mt-12 text-lg font-semibold text-foreground">
        {t("housingDetail.studentReviews")}
      </h2>

      {reviewList.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={t("housingDetail.noReviews")}
            body={t("housingDetail.noReviewsBody")}
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {reviewList.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </Container>
  );
}
