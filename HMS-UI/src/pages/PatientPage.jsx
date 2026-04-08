import { useState } from "react";
import PatientApi from "../api/PatientApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const PatientPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(PatientApi);
  const [editing, setEditing] = useState(null);



// Handle Create and Update
  const handleSubmit = (formData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: Number(formData.gender), // ✅ enum باید عدد باشد
      dob: formData.dob, // ✅ DateOnly
      phone: formData.phone,
      address: formData.address,
      nationalId: formData.nationalId,
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };


// Every Field for the Create and Update
  const patientFields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
      ],
      required: true,
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "nationalId", label: "National Id", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
  ];


  // Every Field for Select
  const patientColumns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "gender", label: "Gender" },
    { key: "dob", label: "DOB" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "nationalId", label: "National Id" },
  ];


  return (
    <Layout>
      <ReusableForm
        fields={patientFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Patient" : "Register Patient"}
      />
      <DataTable
        columns={patientColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default PatientPage;
