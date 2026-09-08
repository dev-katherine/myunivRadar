import Link from "next/link";
import type { University } from "@/lib/types";

export function UniversityCard({
  university,
  href,
  comingSoonLabel,
  onSelectDisabled,
}: {
  university: University;
  href: string;
  comingSoonLabel: string;
  onSelectDisabled: (university: University) => void;
}) {
  const baseClasses =
    "flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-5 text-left transition";

  if (!university.enabled) {
    return (
      <button
        type="button"
        onClick={() => onSelectDisabled(university)}
        className={`${baseClasses} cursor-pointer opacity-70 hover:opacity-100 hover:border-foreground/20`}
      >
        <span className="font-semibold text-foreground">{university.name}</span>
        <span className="mt-3 inline-flex w-fit items-center rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
          {comingSoonLabel}
        </span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} hover:border-accent hover:shadow-sm`}
    >
      <span className="font-semibold text-foreground">{university.name}</span>
      <span className="mt-3 inline-flex w-fit items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
        →
      </span>
    </Link>
  );
}
