import { useState } from "react";

const Form = ({ fields, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(f => (
        <input
          key={f.name}
          placeholder={f.label}
          value={formData[f.name] || ""}
          onChange={(e) => handleChange(e, f.name)}
        />
      ))}

      <button>Save</button>
    </form>
  );
};

export default Form;