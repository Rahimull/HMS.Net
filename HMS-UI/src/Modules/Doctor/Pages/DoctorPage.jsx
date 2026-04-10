import { useState,useEffect } from "react";
import DoctorApi from "../../../api/DoctorsModules/DoctorApi"
import PatientApi from "../../../api/PatientApi";
import useCrud from "../../../hooks/useCurd";
import DataTable from "../../../components/common/DataTable";
import Layout from "../../../components/layout/Layout";
import ReusableForm from "../../../components/form/ResusableForm";
import Loader from "../../../components/common/Loader";

const DoctorPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(DoctorApi);

  const [editing, setEditing] = useState(null);
  const [patients, setPatients] = useState([]);
  const [receptionDoctor, setReceptionDoctor] = useState([]);

  useEffect(() => {
    PatientApi.getAll().then((res) => {
      console.log("Patients Api: ",res.data.data);
      setPatients(res.data.data);
    });
  }, []);
 

 
  const patientOptions = patients.map((d) => ({
    value: d.id,
    label: `${d.firstName} ${d.lastName}`,
  }));
  const receptionDoctorOptions = receptionDoctor.map((d) => ({
    value: d.id,
    label: d.fullName,
  }));

  // Submit (create / update)
  const handleSubmit = (formData) => {
    const payload = {
      DoctorDate: formData.DoctorDate,
      DoctorTime: formData.DoctorTime,
      patientId: formData.patientId, // ✅ enum باید عدد باشد
      notes: formData.notes, // ✅ DateOnly
      receptionDoctorId: formData.receptionDoctorId,
      departmentId: formData.departmentId,
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };

  // From Fields
  const DoctorFields = [
    {
      name: "patientId",
      label: "Patient",
      type: "select",
      options: patientOptions,
      required: true,
    },
    {
      name: "receptionDoctorId",
      label: "Doctor",
      type: "select",
      options: receptionDoctorOptions,
      required: true,
    },
    {
      name: "DoctorDate",
      label: "Doctor Date",
      type: "date",
      required: true,
    },
    {
      name: "DoctorTime",
      label: "Doctor Time",
      type: "time",
      required: true,
    },
    { name: "notes", label: "Notes", type: "textarea" },
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
  ];

  // Table Columns
  const DoctorColumns = [
    { key: "id", label: "ID" },
    { key: "DoctorDate", label: "Doctor Date" },
    { key: "DoctorTime", label: "Doctor Time" },
    { key: "notes", label: "Notes" },
    { key: "patientId", label: "Pateint Name" },
    { key: "receptionDoctorId", label: "Doctor Name" },
    { key: "departmentId", label: "Department" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={DoctorFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Doctor" : "Register Doctor"}
      />

      {/* Errors */}
      {error && <p style={{color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ?
      (
        <Loader />
      ) :(
        <DataTable
        columns={DoctorColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
      )}
      
    </Layout>
  );
};

export default DoctorPage;
