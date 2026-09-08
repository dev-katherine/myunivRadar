"use client";

import { Container } from "@/components/Container";
import { CampusCard } from "@/components/CampusCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusesByUniversity } from "@/lib/services/campusService";

export default function UtahCampusSelectPage() {
  const { t } = useTranslation();
  const campuses = getCampusesByUniversity("utah");

  return (
    <Container className="py-14">
      <p className="text-sm font-medium text-accent">University of Utah</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("campusSelect.title")}
      </h1>
      <p className="mt-2 max-w-xl text-muted">{t("campusSelect.subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-xl">
        {campuses.map((campus) => (
          <CampusCard key={campus.id} campus={campus} href={`/utah/${campus.id}`} />
        ))}
      </div>
    </Container>
  );
}
