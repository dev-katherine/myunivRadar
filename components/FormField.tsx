export function FormField({
  label,
  htmlFor,
  optionalLabel,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optionalLabel?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {optionalLabel && (
          <span className="ml-1.5 text-xs font-normal text-muted">({optionalLabel})</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
