"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { translations, type Locale } from "@/lib/i18n/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "univradar-locale";

// The locale lives in localStorage (an external store) rather than React
// state, read via useSyncExternalStore. That gives a safe SSR snapshot
// ("en") and picks up the stored value on the client without the
// mount-then-setState dance that trips hydration warnings.
const listeners = new Set<() => void>();

function readLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "ko" ? stored : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, getServerSnapshot);
  const setLocale = useCallback((next: Locale) => writeLocale(next), []);
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

function getPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      obj
    );
}

// Usage: const { t, locale, setLocale } = useTranslation();  t("home.title")
export function useTranslation() {
  const { locale, setLocale } = useLanguage();

  const t = useCallback(
    (path: string): string => {
      const value =
        getPath(translations[locale], path) ?? getPath(translations.en, path);
      return typeof value === "string" ? value : path;
    },
    [locale]
  );

  return { t, locale, setLocale };
}
