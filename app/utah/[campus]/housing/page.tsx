"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingByCampus } from "@/lib/services/housingService";

export default function HousingTypeSelectPage() {
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
  const base = `/utah/${campus.id}/housing`;
  const dormCount = getHousingByCampus(campus.id, "dorm").length;
  const apartmentCount = getHousingByCampus(campus.id, "apartment").length;

  return (
    <Container className="py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("housing.chooseType")}
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`${base}/dorms`}
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-accent hover:shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">{t("housing.dorms")}</h2>
          <p className="mt-1.5 text-sm text-muted">{t("housing.dormsDesc")}</p>
          <p className="mt-4 text-xs font-medium text-muted">{dormCount}</p>
        </Link>

        <Link
          href={`${base}/apartments`}
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-accent hover:shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {t("housing.apartments")}
          </h2>
          <p className="mt-1.5 text-sm text-muted">{t("housing.apartmentsDesc")}</p>
          <p className="mt-4 text-xs font-medium text-muted">{apartmentCount}</p>
        </Link>
      </div>
    </Container>
  );
}
