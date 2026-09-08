import Link from "next/link";
import type { Campus } from "@/lib/types";

export function CampusCard({ campus, href }: { campus: Campus; href: string }) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 transition hover:border-accent hover:shadow-sm"
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
          {campus.shortName}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{campus.name}</h3>
      </div>
    </Link>
  );
}
