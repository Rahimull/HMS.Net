import React, { useEffect, useMemo, useState } from "react";

const ReusableForm = ({
  fields,
  onSubmit,
  initialValues = null,
  submitText = "Submit",
}) => {
  // ✅ initialState را یکبار و وابسته به fields بساز (نه هر رندر)
  const initialState = useMemo(() => {
    const state = {};
    fields.forEach((f) => {
      // checkbox باید boolean باشد
      if (f.type === "checkbox") {
        state[f.name] = Boolean(f.defaultValue ?? false);
      } else {
        state[f.name] = f.defaultValue ?? "";
      }
    });
    return state;
  }, [fields]);

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
  }, [initialValues, initialState]);

  // ✅ Correct type handling (checkbox/select)
  const handleChange = (e, field) => {
    let value;

    if (field.type === "checkbox") {
      value = e.target.checked; // ✅ boolean
    } else if (field.type === "select") {
      // اگر گزینه‌ها عددی هستند (مثل gender)
      value = e.target.value === "" ? "" : Number(e.target.value);
    } else {
      value = e.target.value; // text/date/time/textarea
    }

    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    fields.forEach((f) => {
      // required برای checkbox یعنی باید true باشد
      if (f.required) {
        if (f.type === "checkbox") {
          if (formData[f.name] !== true) {
            valid = false;
            newErrors[f.name] = `${f.label} must be checked`;
          }
        } else {
          if (!formData[f.name]) {
            valid = false;
            newErrors[f.name] = `${f.label} is required`;
          }
        }
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow mt-6"
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              value={formData[field.name] ?? ""}
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
          ) : field.type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(formData[field.name])}
                onChange={(e) => handleChange(e, field)}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-600">Yes</span>
            </div>
          ) : (
            <input
              type={field.type || "text"}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleChange(e, field)}
              className="w-full border rounded p-2"
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900"
      >
        {submitText}
      </button>
    </form>
  );
};

export default ReusableForm;