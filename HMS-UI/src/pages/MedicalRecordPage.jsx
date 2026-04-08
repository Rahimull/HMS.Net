import { useEffect, useState } from "react";
import MedicalRecordApi from "../api/MedicalRecordApi";
import PatientApi from "../api/PatientApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const MedicalRecordPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(MedicalRecordApi);
  const [editing, setEditing] = useState(null);


  // Fk or relation rendring
  const [patients, setPatients] = useState([]);
  useEffect(()=>{
    PatientApi.getAll().then(res => setPatients(res.data))
  },[])

  const patientOptions = patients.map(p => ({
    value: p.id,
    label: p.firstName && p.lastName
  }))


// Handle Create and Update
  const handleSubmit = (formData) => {
    const payload = {
      recordNumber: formData.recordNumber,
      patientId: formData.patientId,
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };


// Every Field for the Create and Update
  const MedicalRecordFields = [
    { name: "recordNumber", label: "Record Number", type: "text", required: true },
    {
      name: "patientId",
      label: "Patient Full Name",
      type: "select",
      options: patientOptions,
      required: true,
    },
   
  ];


  // Every Field for Select
  const MedicalRecordColumns = [
    { key: "id", label: "ID" },
    { key: "recordNumber", label: "Record Number" },
    { key: "patientId", label: "Patient Name" },
  ];


  return (
    <Layout>
      <ReusableForm
        fields={MedicalRecordFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update MedicalRecord" : "Register MedicalRecord"}
      />
      <DataTable
        columns={MedicalRecordColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default MedicalRecordPage;
