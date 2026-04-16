import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import AppointmentApi from "../../../api/reception/AppointmentApi";
import { useEffect, useState } from "react";
import { PatientApi } from "@/api";
import DoctorApi from "@/api/doctor/DoctorApi";
import DepartmentApi from "@/api/DepartmentApi";


const AppointmentPage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(()=>{
    PatientApi.getPaged({page:1, pageSize:1000})
      .then(res => setPatients(res.data.data.data));
    DoctorApi.getPaged({page:1, pageSize:1000})
      .then(res => setDoctors(res.data.data.data));
    DepartmentApi.getPaged({page:1, pageSize:1000})
      .then(res => setDepartment(res.data.data.data))  

  },[]);

  const patientOption = patients.map(p => ({
    label: `${p.firstName}  ${p.lastName}`,
    value: p.id 
  }));
  const doctorOption = doctors.map(d => ({
    label: `${d.firstName}  ${d.lastName}`,
    value: d.id 
  }));
  const departmentOption = department.map(d =>
  ({
    label: d.name,
    value: d.id
  })
  )
  
  return (
  <BaseCrudPage
    title="Appointment"
    service={AppointmentApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", options:patientOption, required: true },
      { name: "doctorId", label: "Doctors", type: "select", options:doctorOption},
      { name: "departmentId", label: "Department", type: "select", options:departmentOption},
      { name: "appointmentDate", label: "Appointment Date", type: "date" },
      { name: "appointmentTime", label: "Appointment Time", type: "time" },
      { name: "notes", label: "Notes", type: "textarea" },
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "departmentId", header: "Department" },
      { accessorKey: "appointmentDate", header: "Date" },
      { accessorKey: "appointmentTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      departmentId: form.departmentId,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      notes: form.notes,
  
    }
    
  )}
  />
);
}
export default AppointmentPage;
