import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicalRecordApi from "../../../api/reception/MedicalRecordApi";
import { useEffect, useState } from "react";
import { PatientApi } from "@/api";

const MedicalRecordPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    PatientApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setPatients(res.data.data.data),
    );
  }, []);

  // select Patient 
  const patientOption = patients.map(p => (
    {
    label: `${p.firstName} ${p.lastName}`,
    value: p.id
  }
  ));

  return (
    <BaseCrudPage
      title="MedicalRecord"
      service={MedicalRecordApi}
      fields={[
        {
          name: "patientId",
          label: "Patients",
          type: "select",
          required: true,
          options: patientOption,
        },
        { name: "recordNumber", label: "Record Number", type: "text" },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "patientId", header: "Patient Id"},
        { accessorKey: "patientName", header: "Patient Full Name"},
        { accessorKey: "recordNumber", header: "Record Number" },
      ]}
      mapFormToPayload={(form) => ({
        patientId: form.patientId,
        recordNumber: form.recordNumber,
      })}
    />
  );
};

export default MedicalRecordPage;
