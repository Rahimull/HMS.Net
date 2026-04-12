import { useState,useEffect } from "react";
import AppointmentApi from "../api/AppointmentApi";
import PatientApi from "../api/PatientApi";
import DepartmentApi from "../api/DepartmentApi";
import ReceptionDoctorApi from "../api/ReceptionDoctorApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";
import Loader from "../components/common/Loader";

const AppointmentPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(AppointmentApi);

  const [editing, setEditing] = useState(null);
  const [patients, setPatients] = useState([]);
  const [receptionDoctor, setReceptionDoctor] = useState([]);

  useEffect(() => {
    PatientApi.getAll().then((res) => {
      console.log("Patients Api: ",res.data.data);
      setPatients(res.data.data);
    });
  }, []);
  useEffect(() => {
    ReceptionDoctorApi.getAll().then((res) => {
      setReceptionDoctor(res.data.data);
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
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
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

 /* ---------- FORM ---------- */
  const AppointmentFields = [
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
      name: "appointmentDate",
      label: "Appointment Date",
      type: "date",
      required: true,
    },
    {
      name: "appointmentTime",
      label: "Appointment Time",
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
  const AppointmentColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "appointmentDate", header: "Appointment Date" },
    { accessorKey: "appointmentTime", header: "Appointment Time" },
    { accessorKey: "notes", header: "Notes" },
    { accessorKey: "patientId", header: "Pateint Name" },
    { accessorKey: "receptionDoctorId", header: "Doctor Name" },
    { accessorKey: "departmentId", header: "Department" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={AppointmentFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Appointment" : "Register Appointment"}
      />

      {/* Errors */}
      {error && <p style={{color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ?
      (
        <Loader />
      ) :(
        <DataTable
        columns={AppointmentColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
      )}
      
    </Layout>
  );
};

export default AppointmentPage;
