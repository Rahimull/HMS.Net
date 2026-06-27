import React, { useEffect, useMemo, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const ReusableForm = ({
  fields,
  onSubmit,
  initialValues = null,
  submitText = "Submit",
}) => {
  // ---------------------------
  // 1. Initial State Builder
  // ---------------------------
  const initialState = useMemo(() => {
    const state = {};

    fields.forEach((f) => {
      if (f.type === "checkbox") {
        state[f.name] = Boolean(f.defaultValue ?? false);
      } else {
        state[f.name] = f.defaultValue ?? "";
      }
    });

    return state;
  }, [fields]);

  // ---------------------------
  // 2. States
  // ---------------------------
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // 3. Sync (Edit / Add mode)
  // ---------------------------
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

  // ---------------------------
  // 4. Handle Change
  // ---------------------------
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------------------
  // 5. Validation
  // ---------------------------
  const validate = () => {
    const newErrors = {};
    let valid = true;

    fields.forEach((f) => {
      console.log("Field: ", f);
      if (f.required) {
        if (f.type === "checkbox") {
          if (!formData[f.name]) {
            valid = false;
            newErrors[f.name] = `${f.label} is required`;
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
    return valid;
  };

  // ---------------------------
  // 6. Submit Handler
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      console.log("Before Submit");
      await onSubmit(formData);
      console.log(formData)
      console.log("After Submit");

      if (!initialValues) {
        setFormData(initialState);
      }
    } catch (error) {
  const response = error.response?.data;

  console.log("API ERROR:", response);

  if (response?.errors) {
    const formattedErrors = {};

    Object.keys(response.errors).forEach((key) => {
      formattedErrors[key] = response.errors[key][0];
    });

    setServerErrors(formattedErrors);
    return;
  }

  setServerErrors({
    general: response?.message || "Error occurred"
  });
} finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // 7. UI
  // ---------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow mt-6"
    >
      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.col === 2 ? "col-span-2" : "col-span-1"}
          >
            <Input
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              autoFocus={field.autoFocus || false}
              value={formData[field.name] || ""}
              onChange={handleChange}
              options={field.options || []}
              maxLength={field.maxLength || 100}
              placeholder={field.placeholder}
              error={ serverErrors[field.name] || errors[field.name]}
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Loading..." : submitText}
      </Button>
    </form>
  );
};

export default ReusableForm;
