export default function FormField({ label, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-base-content/70">{hint}</p>}
      {error && (
        <p className="text-sm font-semibold text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
