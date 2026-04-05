import ReusableForm from "./components/Form/ReusableForm";

const patientFields = [
  { name: "name", label: "Patient Name", type: "text", required: true },
  { name: "age", label: "Age", type: "number", required: true },
  { name: "gender", label: "Gender", type: "select", options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" }
    ], required: true
  },
  { name: "address", label: "Address", type: "textarea" },
];

const handlePatientSubmit = (data) => {
  console.log("Patient Form Data:", data);
  // می‌توان اینجا API POST زد
};

<ReusableForm fields={patientFields} onSubmit={handlePatientSubmit} submitText="Register Patient" />