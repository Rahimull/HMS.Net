import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ConsultationApi from "../../../api/doctor/ConsultationApi";
import { useEffect, useState } from "react";
import { DoctorApi, PatientApi } from "@/api";


const ConsultationPage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{
    PatientApi.getPaged({page:1, pageSize:1000})
      .then(res => setPatients(res.data.data.data));

    DoctorApi.getPaged({page:1, pageSize:1000})
      .then(res => setDoctors(res.data.data.data));
  },[])

  const patientOptions = patients.map(p => (
    {
      label: `${p.firstName} - ${p.lastName}`,
      value: p.id
    }
  ))

  const doctorOptions = doctors.map(p => (
    {
      label: `${p.firstName} - ${p.lastName}`,
      value: p.id
    }
  )) 

  return (
    <BaseCrudPage
      title="Consultation"
      service={ConsultationApi}
      fields={[
        {
          name: "visitDate",
          label: "Visit Date",
          type: "datetime-local",
          required: true,
        },
        {
          name: "chiefComplaint",
          label: "Chief Complaint",
          type: "text",
          required: true,
        },
        {
          name: "patientId",
          label: "Patient",
          type: "select",
          options: patientOptions,
        },
        {
          name: "doctorId",
          label: "Doctor",
          type: "select",
          options: doctorOptions,
        },
        {
          name: "examination",
          label: "Examination",
          type: "Text",
          required: true,
        },
        
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "visitDate", header: "Visit Date" },
        { accessorKey: "chiefComplaint", header: "Chief Complaint" },
        { accessorKey: "notes", header: "Notes" },
        { accessorKey: "examination", header: "Examination" },
        { accessorKey: "doctorName", header: "Doctor Name" },
        { accessorKey: "patientName", header: "Patient Name" },
      ]}
      mapFormToPayload={(formData) => ({
        visitDate: formData.visitDate,
        chiefComplaint: formData.chiefComplaint,
        notes: formData.notes,
        examination: formData.examination,
        doctorId: Number(formData.doctorId),
        patientId: Number(formData.patientId),
      })}
    />
  );
};

export default ConsultationPage;
