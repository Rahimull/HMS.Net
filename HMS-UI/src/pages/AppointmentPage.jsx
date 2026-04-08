import { useState } from "react";
import AppointmentApi from "../api/AppointmentApi";
import PatientApi from "../api/PatientApi";
import DepartmentApi from "../api/DepartmentApi";
import ReceptionDoctorApi from "../api/ReceptionDoctorApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const AppointmentPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(AppointmentApi);
  const [editing, setEditing] = useState(null);

  // Select or Fk rendering
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [receptionDoctor, setReceptionDoctor] = useState([]);

  
  useEffect(()=>{
    DepartmentApi.getAll().then(res => setDepartments(res.data))
  },[])
  useEffect(()=>{
    PatientApi.getAll().then(res => setPatients(res.data))
  },[])
  useEffect(()=>{
    ReceptionDoctorApi.getAll().then((res)=> setReceptionDoctor(res.data));
  },[])

  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  const patientOptions = patients.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  const receptionDoctorOptions = receptionDoctor.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  // Handle Create and Update
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

  // Every Field for the Create and Update
  const AppointmentFields = [
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
    { name: "netes", label: "Notes", type: "text" },
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

  // Every Field for Select
  const AppointmentColumns = [
    { key: "id", label: "ID" },
    { key: "appointmentDate", label: "Appointment Date" },
    { key: "appointmentTime", label: "Appointment Time" },
    { key: "notes", label: "Notes" },
    { key: "patientId", label: "Pateint Name" },
    { key: "receptionDoctorId", label: "Doctor Name" },
    { key: "departmentId", label: "Department" },
  ];

  return (
    <Layout>
      <ReusableForm
        fields={AppointmentFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Appointment" : "Register Appointment"}
      />
      <DataTable
        columns={AppointmentColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default AppointmentPage;
