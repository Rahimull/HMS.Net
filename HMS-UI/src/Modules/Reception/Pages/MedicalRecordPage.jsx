
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicalRecordApi from "../../../api/reception/MedicalRecordApi";
const MedicalRecordPage = () => (
  

  <BaseCrudPage
    title="MedicalRecord"
    service={MedicalRecordApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true, options: [{1: "rahim"}] },
      { name: "recordNumber", label: "Record Number", type: "select" },
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "recordNumber", header: "Record Number" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      recordNumber: form.recordNumber,
    })}
  />
);

export default MedicalRecordPage;