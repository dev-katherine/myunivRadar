"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { FormField } from "@/components/FormField";
import { Select, inputClasses } from "@/components/Select";
import { StarRatingInput } from "@/components/StarRatingInput";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingByCampus } from "@/lib/services/housingService";
import {
  submitReview,
  type ReviewFieldErrors,
} from "@/lib/services/reviewService";
import { housingTypeToSlug } from "@/lib/housingType";

export default function WriteReviewPage() {
  return (
    <Suspense fallback={null}>
      <WriteReviewForm />
    </Suspense>
  );
}

function WriteReviewForm() {
  const params = useParams<{ campus: string }>();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [housingId, setHousingId] = useState(searchParams.get("housingId") ?? "");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [semester, setSemester] = useState("");
  const [errors, setErrors] = useState<ReviewFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedHousingId, setSubmittedHousingId] = useState<string | null>(null);

  const campus = isValidCampusId(params.campus) ? getCampusById(params.campus) : undefined;
  const housingOptions = useMemo(
    () => (campus ? getHousingByCampus(campus.id) : []),
    [campus]
  );

  if (!campus) {
    return (
      <Container className="py-14">
        <p className="text-muted">Unknown campus.</p>
      </Container>
    );
  }

  if (submittedHousingId) {
    const home = housingOptions.find((h) => h.id === submittedHousingId);
    return (
      <Container className="max-w-xl py-14">
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            {t("review.successTitle")}
          </h1>
          <p className="mt-2 text-sm text-muted">{t("review.successBody")}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmittedHousingId(null);
                setRating(0);
                setTitle("");
                setBody("");
                setSemester("");
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-foreground/30"
            >
              {t("review.writeAnother")}
            </button>
            {home && (
              <Link
                href={`/utah/${campus.id}/housing/${housingTypeToSlug(home.type)}/${home.id}`}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                {t("review.viewHousing")}
              </Link>
            )}
          </div>
        </div>
      </Container>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitReview({ housingId, rating, title, body, semester });
    setSubmitting(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmittedHousingId(result.review.housingId);
  }

  return (
    <Container className="max-w-xl py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("campusHub.writeReview")}
      </h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <FormField label={t("review.housingLabel")} htmlFor="housingId" error={errors.housingId}>
          <Select
            id="housingId"
            value={housingId}
            onChange={(e) => setHousingId(e.target.value)}
            placeholder={t("review.housingPlaceholder")}
            options={housingOptions.map((h) => ({
              value: h.id,
              label: `${h.name} (${t(h.type === "dorm" ? "housing.dorms" : "housing.apartments")})`,
            }))}
          />
        </FormField>

        <FormField label={t("review.ratingLabel")} htmlFor="rating" error={errors.rating}>
          <StarRatingInput value={rating} onChange={setRating} />
        </FormField>

        <FormField label={t("review.titleLabel")} htmlFor="title" error={errors.title}>
          <input
            id="title"
            className={inputClasses}
            value={title}
            maxLength={80}
            placeholder={t("review.titlePlaceholder")}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>

        <FormField label={t("review.bodyLabel")} htmlFor="body" error={errors.body}>
          <textarea
            id="body"
            rows={5}
            className={inputClasses}
            value={body}
            placeholder={t("review.bodyPlaceholder")}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormField>

        <FormField
          label={t("review.semesterLabel")}
          htmlFor="semester"
          optionalLabel={t("common.optional")}
        >
          <input
            id="semester"
            className={inputClasses}
            value={semester}
            placeholder={t("review.semesterPlaceholder")}
            onChange={(e) => setSemester(e.target.value)}
          />
        </FormField>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? t("common.submitting") : t("review.submit")}
        </button>
      </form>
    </Container>
  );
}
