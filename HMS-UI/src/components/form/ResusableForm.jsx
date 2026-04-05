// src/components/Form/ReusableForm.jsx
import React, { useState } from "react";

const ReusableForm = ({ fields, onSubmit, submitText = "Submit" }) => {
  // ایجاد state اولیه برای تمام فیلدها
  const initialState = {};
  fields.forEach((f) => {
    initialState[f.name] = f.defaultValue || "";
  });

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // تغییر مقدار فیلد
  const handleChange = (e, field) => {
    setFormData({ ...formData, [field.name]: e.target.value });
  };

  // Submit فرم
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
      // reset form if needed
      // setFormData(initialState);
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
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              placeholder={field.placeholder || ""}
              className="w-full border rounded p-2"
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.name]}
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
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              placeholder={field.placeholder || ""}
              className="w-full border rounded p-2"
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitText}
      </button>
    </form>
  );
}

export default ReusableForm;
