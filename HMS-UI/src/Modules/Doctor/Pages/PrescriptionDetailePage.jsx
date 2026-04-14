import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PrescriptionDetailApi from "../../../api/doctor/PrescriptionDetailsApi";

const PrescriptionDetailePage = () => (
  <BaseCrudPage
    title="Prescription Details"
    service={PrescriptionDetailApi}
    fields={[
      {
        name: "visitDate",
        label: "Visit Date",
        type: "date",
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
        options: [],
      },
      {
        name: "examination",
        label: "Examination",
        type: "Text",
        required: true,
      },
      {
        name: "doctorId",
        label: "Doctor",
        type: "select",
        options: [],
      },
      { name: "notes", label: "Notes", type: "textarea" },
    ]}
    columns={[
      { accessorKey: "id", header: "ID" },
      { accessorKey: "visitDate", header: "Visit Date" },
      { accessorKey: "chiefComplaint", header: "Chief Complaint" },
      { accessorKey: "notes", header: "Notes" },
      { accessorKey: "examination", header: "Examination" },
      { accessorKey: "doctorId", header: "Doctor Name" },
      { accessorKey: "patientId", header: "Patient Name" },
    ]}
    mapFormToPayload={(form) => ({
      visitDate: formData.visitDate,
      chiefComplaint: formData.chiefComplaint,
      notes: formData.notes,
      examination: formData.examination,
      doctorId: Number(formData.doctorId),
      patientId: Number(formData.patientId),
    })}
  />
);

export default PrescriptionDetailePage;
