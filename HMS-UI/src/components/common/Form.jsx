import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const Form = ({
  fields,
  onSubmit,
  initialValues = {},
  submitText = "Save",
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // 🔄 handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ validation
  const validate = () => {
    let newErrors = {};

    fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* 🔥 ADVANCED GRID LAYOUT ENGINE */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div
            key={f.name}
            className={f.col === 2 ? "col-span-2" : "col-span-1"}
          >
            <Input
              label={f.label}
              name={f.name}
              type={f.type || "text"}
              value={formData[f.name] || ""}
              onChange={handleChange}
              options={f.options || []}
              placeholder={f.placeholder}
              error={errors[f.name]}
            />
          </div>
        ))}
      </div>

      <Button type="submit" variant="success">
        {submitText}
      </Button>
    </form>
  );
};

export default Form;