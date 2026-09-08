export function ComingSoonState({
  universityName,
  title,
  message,
  onClose,
}: {
  universityName: string;
  title: string;
  message: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="status"
      className="relative rounded-xl border border-border bg-accent-soft px-5 py-4"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-muted hover:text-foreground"
        >
          ×
        </button>
      )}
      <p className="text-sm font-semibold text-accent">
        {universityName} · {title}
      </p>
      <p className="mt-1 text-sm text-foreground/80">{message}</p>
    </div>
  );
}
