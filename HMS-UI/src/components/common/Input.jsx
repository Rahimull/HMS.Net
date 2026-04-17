function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  onClick,
  placeholder,
  options = [],
  error,
}) {
  const baseClass = "border p-2 rounded w-full";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* TEXT / NUMBER / DATE / TIME */}
      {type !== "textarea" && type !== "select" && type !== "checkbox" && (
        <input
          className={baseClass}
          type={type}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
        />
      )}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea
          className={baseClass}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {/* SELECT */}
      {type === "select" && (
        <select
          className={baseClass}
          name={name}
          value={value || ""}
          onChange={onChange}
        >
          <option value="">Select...</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* CHECKBOX */}
      {type === "checkbox" && (
        <input
          type="checkbox"
          name={name}
          checked={value || false}
          onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
        />
      )}

      {/* ERROR */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export default Input;