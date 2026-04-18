import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ConsultationApi from "@/api/doctor/ConsultationApi";
import { DoctorApi, PatientApi } from "@/api";
import { useState,useEffect } from "react";
import PrescriptionApi from "@/api/doctor/PrescriptionApi";

const consultationPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [consultations, setconsultations] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    ConsultationApi.getPaged({ page: 1, pageSize: 1000 }).then((res) => setconsultations(res.data.data.data)
    );
    DoctorApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setDoctors(res.data.data.data),
    );
    PatientApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setPatients(res.data.data.data),
    );
  }, []);

  const consultationOptions = consultations.map((p) => ({
    label: p.chiefComplaint,
    value: p.id,
  }
));
  const doctorOptions = doctors.map((p) => ({
    label: `${p.firstName} - ${p.lastName}`,
    value: p.id,
  }));
  const patientOpations = patients.map((p) => ({
    label: `${p.firstName} - ${p.lastName}`,
    value: p.id,
  }));

  console.log("Consultaion: ",consultationOptions)

  return (
    <BaseCrudPage
      title="Prescriptions"
      service={PrescriptionApi}
      fields={[
        {
          name: "consultationId",
          label: "Consulations",
          type: "select",
          options: consultationOptions
        },
        {
          name: "patientId",
          label: "Patient",
          type: "select",
          options: patientOpations,
        },
        {
          name: "doctorId",
          label: "Doctor",
          type: "select",
          options: doctorOptions,
        },
      ]}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "consultationName", header: "Consultation" },
        { accessorKey: "doctorName", header: "Doctor Name" },
        { accessorKey: "patientName", header: "Patient Name" },
      ]}
      mapFormToPayload={(formData) => ({
        consultationId: formData.consultationId,
        doctorId: Number(formData.doctorId),
        patientId: Number(formData.patientId),
      })}
    />
  );
};

export default consultationPage;
