import React, { useEffect, useMemo, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

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
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
            value={formData[field.name] || ""}
            onChange={handleChange}
            options={field.options || []}
            placeholder={field.placeholder}
            error={errors[field.name]}
          />
          
        </div>
      ))}
      </div>

      <Button type="submit" variant="primary">
        {submitText}
      </Button>
    
    </form>
  );
};

export default ReusableForm;