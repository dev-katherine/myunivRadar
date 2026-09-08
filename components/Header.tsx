"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCampusById } from "@/lib/services/campusService";

export function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslation();

  const segments = pathname.split("/").filter(Boolean);
  const campusId = segments[0] === "utah" ? segments[1] : undefined;
  const campus = campusId ? getCampusById(campusId) : undefined;
  const campusBase = campus ? `/utah/${campus.id}` : null;

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
            U
          </span>
          {t("common.productName")}
        </Link>

        <nav className="flex flex-1 items-center gap-6 text-sm font-medium text-muted">
          {campusBase && (
            <>
              <span className="hidden rounded-full border border-border px-2.5 py-1 text-xs text-foreground sm:inline">
                {campus?.shortName}
              </span>
              <Link href={`${campusBase}/housing`} className="hover:text-foreground">
                {t("nav.housing")}
              </Link>
              <Link href={`${campusBase}/write-review`} className="hover:text-foreground">
                {t("nav.writeReview")}
              </Link>
              <Link href={`${campusBase}/sublets`} className="hover:text-foreground">
                {t("nav.sublets")}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={locale === "en" ? "text-accent" : "text-muted hover:text-foreground"}
          >
            EN
          </button>
          <span className="text-border">|</span>
          <button
            type="button"
            onClick={() => setLocale("ko")}
            className={locale === "ko" ? "text-accent" : "text-muted hover:text-foreground"}
          >
            한국어
          </button>
        </div>
      </div>
    </header>
  );
}
