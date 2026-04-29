import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PharmacySaleApi from "@/api/pharmacy/SaleApi";
import { useState, useEffect } from "react";

import PrescriptionApi from "@/api/doctor/PrescriptionApi";
import PatientApi from "@/api/reception/PatientApi";
import DoctorApi from "@/api/doctor/DoctorApi";

const SalePage = () => {
const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [perscriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    PatientApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setPatients(res.data.data.data));
    DoctorApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setDoctors(res.data.data.data));
    PrescriptionApi.getPaged({page: 1, pageSize: 2000})
      .then(res => setPrescriptions(res.data.data.data));
  }, []);

  const patientOptions = patients.map((m) => ({
    label: `${m.firstName} - ${m.lastName}`,
    value: m.id,
  }));
  const doctorsOptions = doctors.map((m) => ({
    label: `${m.firstName} - ${m.lastName}`,
    value: m.id,
  }));
  const prescriptionOptions = perscriptions.map((m) => ({
    label: m.id,
    value: m.id,
  }));


  return (
    <BaseCrudPage
      title="PharmacySale"
      service={PharmacySaleApi}
      fields={[
        { name: "patientId", label: "Patients", type: "select", options: patientOptions },
        { name: "doctorId", label: "Doctors", type: "select", options: doctorsOptions },
        { name: "saleDate", label: "Sate Date", type: "date" },
        { name: "totalAmount", label: "Total Amount", type: "number" },
        { name: "notes", label: "Notes", type: "textarea" },
        {
          name: "prescriptionId",
          label: "Prescriptions",
          type: "select",
          options: prescriptionOptions,
        },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "patientId", header: "Patient", enableSorting: true },
        { accessorKey: "doctorId", header: "Doctors" },
        { accessorKey: "saleDate", header: "Sale Date" },
        { accessorKey: "totalAmount", header: "Total Amount" },
        { accessorKey: "notes", header: "Notes" },
        { accessorKey: "prescriptionId", header: "Prescriptions" },
      ]}
      mapFormToPayload={(form) => ({
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
        saleDate: form.saleDate,
        totalAmount: Number(form.totalAmount),
        prescriptionId: Number(form.prescriptionId),
        notes: form.notes,
      })}
    />
  );
};

export default SalePage;
