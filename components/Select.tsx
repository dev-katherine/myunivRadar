import { forwardRef } from "react";

export const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

type Option = { value: string; label: string };

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: Option[];
    placeholder?: string;
  }
>(function Select({ options, placeholder, className = "", ...props }, ref) {
  return (
    <select ref={ref} className={`${inputClasses} ${className}`} {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});
