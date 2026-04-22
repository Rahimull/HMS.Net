const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  options = [],
  error,
  disabled = false,
}) => {
  const baseClass = `
    border p-2 rounded focus:ring-2 focus:ring-blue-500
    ${error ? "border-red-500" : "border-gray-300"}
    ${className}
  `;

  return (
    <div className="flex flex-col space-y-1">

      {label && type !== "checkbox" && (
        <label className="text-sm font-medium">{label}</label>
      )}

      {type === "textarea" && (
        <textarea
          className={baseClass}
          name={name}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {type === "select" && (
        <select
          className={baseClass}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="" disabled>Select...</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {type === "checkbox" && (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            checked={value || false}
            onChange={(e) =>
              onChange({ target: { name, value: e.target.checked } })
            }
          />
          <span>{label}</span>
        </label>
      )}

      {!["textarea", "select", "checkbox"].includes(type) && (
        <input
          className={baseClass}
          type={type}
          name={name}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Input;