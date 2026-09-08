"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import { HousingCard } from "@/components/HousingCard";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingByCampus } from "@/lib/services/housingService";
import { getAverageRating, getReviewsByHousing } from "@/lib/services/reviewService";
import { isValidHousingTypeSlug, slugToHousingType } from "@/lib/housingType";

export default function HousingListPage() {
  const params = useParams<{ campus: string; type: string }>();
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
  const list = getHousingByCampus(campus.id, type);
  const typeLabel = t(type === "dorm" ? "housing.dorms" : "housing.apartments");

  return (
    <Container className="py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {typeLabel}
      </h1>

      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState title={t("housing.noHousing")} />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((housing) => {
            const reviewCount = getReviewsByHousing(housing.id).length;
            return (
              <HousingCard
                key={housing.id}
                housing={housing}
                href={`/utah/${campus.id}/housing/${params.type}/${housing.id}`}
                typeLabel={typeLabel}
                campusLabel={campus.name}
                avgRating={getAverageRating(housing.id)}
                reviewCount={reviewCount}
                noRatingLabel={t("housing.noRatingYet")}
              />
            );
          })}
        </div>
      )}
    </Container>
  );
}
