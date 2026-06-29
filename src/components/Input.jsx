export default function Input({
  label,
  id,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-ink-light"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-ink placeholder:text-ink-light/50 transition-colors focus:border-leather focus:outline-none focus:ring-2 focus:ring-leather/20 ${
          error ? "border-red-400" : "border-parchment"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
