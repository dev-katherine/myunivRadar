"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/Container";
import { FormField } from "@/components/FormField";
import { Select, inputClasses } from "@/components/Select";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById, isValidCampusId } from "@/lib/services/campusService";
import { getHousingByCampus } from "@/lib/services/housingService";
import {
  submitSublet,
  type SubletFieldErrors,
} from "@/lib/services/subletService";

export default function NewSubletPage() {
  const params = useParams<{ campus: string }>();
  const { t } = useTranslation();

  const [housingId, setHousingId] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<SubletFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const campus = isValidCampusId(params.campus) ? getCampusById(params.campus) : undefined;
  const apartments = useMemo(
    () => (campus ? getHousingByCampus(campus.id, "apartment") : []),
    [campus]
  );

  if (!campus) {
    return (
      <Container className="py-14">
        <p className="text-muted">Unknown campus.</p>
      </Container>
    );
  }

  if (submitted) {
    return (
      <Container className="max-w-xl py-14">
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            {t("subletForm.successTitle")}
          </h1>
          <p className="mt-2 text-sm text-muted">{t("subletForm.successBody")}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setHousingId("");
                setAvailableFrom("");
                setAvailableUntil("");
                setPrice("");
                setRoomType("");
                setDescription("");
                setContact("");
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-foreground/30"
            >
              {t("subletForm.postAnother")}
            </button>
            <Link
              href={`/utah/${campus.id}/sublets`}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
            >
              {t("subletForm.viewSublets")}
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitSublet({
      housingId,
      availableFrom,
      availableUntil,
      price: Number(price),
      roomType,
      description,
      contact,
    });
    setSubmitting(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <Container className="max-w-xl py-14">
      <p className="text-sm font-medium text-accent">
        University of Utah · {campus.shortName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("sublets.createCta")}
      </h1>
      <p className="mt-2 text-sm text-muted">{t("sublets.apartmentOnlyNote")}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <FormField
          label={t("subletForm.apartmentLabel")}
          htmlFor="housingId"
          error={errors.housingId}
        >
          <Select
            id="housingId"
            value={housingId}
            onChange={(e) => setHousingId(e.target.value)}
            placeholder={t("subletForm.apartmentPlaceholder")}
            options={apartments.map((h) => ({ value: h.id, label: h.name }))}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={t("subletForm.fromLabel")}
            htmlFor="availableFrom"
            error={errors.availableFrom}
          >
            <input
              id="availableFrom"
              type="date"
              className={inputClasses}
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </FormField>
          <FormField
            label={t("subletForm.untilLabel")}
            htmlFor="availableUntil"
            error={errors.availableUntil}
          >
            <input
              id="availableUntil"
              type="date"
              className={inputClasses}
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </FormField>
        </div>

        <FormField label={t("subletForm.priceLabel")} htmlFor="price" error={errors.price}>
          <input
            id="price"
            type="number"
            min={0}
            className={inputClasses}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormField>

        <FormField
          label={t("subletForm.roomTypeLabel")}
          htmlFor="roomType"
          optionalLabel={t("common.optional")}
        >
          <input
            id="roomType"
            className={inputClasses}
            value={roomType}
            placeholder={t("subletForm.roomTypePlaceholder")}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </FormField>

        <FormField
          label={t("subletForm.descriptionLabel")}
          htmlFor="description"
          error={errors.description}
        >
          <textarea
            id="description"
            rows={4}
            className={inputClasses}
            value={description}
            placeholder={t("subletForm.descriptionPlaceholder")}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <FormField
          label={t("subletForm.contactLabel")}
          htmlFor="contact"
          error={errors.contact}
        >
          <input
            id="contact"
            className={inputClasses}
            value={contact}
            placeholder={t("subletForm.contactPlaceholder")}
            onChange={(e) => setContact(e.target.value)}
          />
        </FormField>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? t("common.submitting") : t("subletForm.submit")}
        </button>
      </form>
    </Container>
  );
}
