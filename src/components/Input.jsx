export default function Input({ label, error, id, as = "input", children, className = "", ...props }) {
  const inputId = id || props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="label-text">
          {label}
        </label>
      )}
      {as === "select" ? (
        <select
          id={inputId}
          className={`input-field ${error ? "input-field-error" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          id={inputId}
          className={`input-field ${error ? "input-field-error" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      )}
      {error && (
        <p id={`${inputId}-error`} className="field-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
