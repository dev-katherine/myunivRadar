"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";

export default function CampusHubPage() {
  const params = useParams<{ campus: string }>();
  const { t } = useTranslation();

  if (!isValidCampusId(params.campus)) {
    return (
      <Container className="py-14">
        <p className="text-muted">Unknown campus.</p>
      </Container>
    );
  }

  const campus = getCampusById(params.campus)!;
  const base = `/utah/${campus.id}`;

  return (
    <Container className="py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {campus.name}
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`${base}/housing`}
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-accent hover:shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {t("campusHub.exploreHousing")}
          </h2>
          <p className="mt-1.5 text-sm text-muted">{t("campusHub.exploreHousingDesc")}</p>
        </Link>

        <Link
          href={`${base}/write-review`}
          className="rounded-xl border border-accent bg-accent-soft p-6 transition hover:shadow-sm"
        >
          <h2 className="text-lg font-semibold text-accent">
            {t("campusHub.writeReview")}
          </h2>
          <p className="mt-1.5 text-sm text-accent/80">{t("campusHub.writeReviewDesc")}</p>
        </Link>
      </div>

      <Link
        href={`${base}/sublets`}
        className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-4 transition hover:border-foreground/20"
      >
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {t("campusHub.browseSublets")}
          </h2>
          <p className="mt-0.5 text-xs text-muted">{t("campusHub.browseSubletsDesc")}</p>
        </div>
        <span className="text-muted">→</span>
      </Link>
    </Container>
  );
}
