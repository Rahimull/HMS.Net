import React, { useEffect, useState } from "react";

const ReusableForm = ({
  fields,
  onSubmit,
  initialValues = null,
  submitText = "Submit",
}) => {
  const initialState = {};
  fields.forEach((f) => {
    initialState[f.name] = f.defaultValue || "";
  });

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // ✅ Sync form with edit/add mode
  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...initialState,
        ...initialValues,
      });
    } else {
      setFormData(initialState);
    }
  }, [initialValues]);

  // ✅ Correct type handling
  const handleChange = (e, field) => {
    let value = e.target.value;

    if (field.type === "select") {
      value = value === "" ? "" : Number(value);
    }

    setFormData({
      ...formData,
      [field.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        valid = false;
        newErrors[f.name] = `${f.label} is required`;
      }
    });

    setErrors(newErrors);

    if (valid) {
      onSubmit(formData);

      // ✅ reset form only in add mode
      if (!initialValues) {
        setFormData(initialState);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mt-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field)}
              className="w-full border rounded p-2"
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.name] ?? ""}
              onChange={(e) => handleChange(e, field)}
              className="w-full border rounded p-2"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field)}
              className="w-full border rounded p-2"
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900">
        {submitText}
      </button>
    </form>
  );
};

export default ReusableForm;