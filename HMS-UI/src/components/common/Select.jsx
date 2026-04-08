const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block mb-1 font-medium">
          {label} {required && "*"}
        </label>
      )}
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded p-2"
      >
        {options.map((opt)=>(
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
