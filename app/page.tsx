"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { UniversityCard } from "@/components/UniversityCard";
import { ComingSoonState } from "@/components/ComingSoonState";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getUniversities } from "@/lib/services/universityService";
import type { University } from "@/lib/types";

export default function HomePage() {
  const { t } = useTranslation();
  const universities = getUniversities();
  const [comingSoon, setComingSoon] = useState<University | null>(null);

  return (
    <Container className="py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("home.title")}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {t("home.subtitle")}
        </p>
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
        {t("home.chooseUniversity")}
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            href={`/${university.id}`}
            comingSoonLabel={t("home.comingSoonTag")}
            onSelectDisabled={setComingSoon}
          />
        ))}
      </div>

      {comingSoon && (
        <div className="mt-6">
          <ComingSoonState
            universityName={comingSoon.name}
            title={t("comingSoon.title")}
            message={t("comingSoon.message")}
            onClose={() => setComingSoon(null)}
          />
        </div>
      )}
    </Container>
  );
}
