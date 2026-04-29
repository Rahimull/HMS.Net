import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PrescriptionDetailsApi from "@/api/doctor/PrescriptionDetailsApi";
import { useEffect, useState } from "react";
import PrescriptionApi from "@/api/doctor/PrescriptionApi";
import ItemApi from "@/api/store/ItemApi";

const PrescriptionDetailePage = () => {
  const [Item, setItem] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    PrescriptionApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setPrescriptions(res.data.data.data),
    );
    ItemApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setItem(res.data.data.data),
    );
  }, []);

  const prescriptionOptions = prescriptions.map(p => ({
    label : p.id,
    value: p.id
  }))
  const medicineOptions = Item.map(p => ({
    label : p.name,
    value: p.id
  }))

  return (
    <BaseCrudPage
      title="Prescription Details"
      service={PrescriptionDetailsApi}
      fields={[
        {
          name: "medicationName",
          label: "Medication Name",
          type: "text",
          required: true,
        },
        {
          name: "dosage",
          label: "Dosage",
          type: "text",
          required: true,
        },
        {
          name: "prescriptionId",
          label: "Prescreption",
          type: "select",
          options: prescriptionOptions,
        },
        {
          name: "medicineId",
          label: "Medicine",
          type: "select",
          options: medicineOptions,
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "datetime-local",
        },
        {
          name: "endDate",
          label: "End Date",
          type: "datetime-local",
        },
        { name: "frequency", label: "frequency", type: "text", require: true },
      ]}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "medicationName", header: "Medication" },
        { accessorKey: "dosage", header: "Dosage" },
        { accessorKey: "frequency", header: "Frequency" },
        { accessorKey: "startDate", header: "Start Date" },
        { accessorKey: "endDate", header: "End Date" },
        { accessorKey: "prescriptionId", header: "Prescription Name" },
        { accessorKey: "medicineName", header: "Medicine" },
      ]}
      mapFormToPayload={(formData) => ({
        medicationName: formData.medicationName,
        dosage: formData.dosage,
        frequency: formData.frequency,
        startDate: formData.startDate,
        endDate: formData.endDate,
        prescriptionId: Number(formData.prescriptionId),
        medicineId: Number(formData.medicineId),
      })}
    />
  );
};

export default PrescriptionDetailePage;
