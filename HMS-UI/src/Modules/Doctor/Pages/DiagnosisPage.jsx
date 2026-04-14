import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import DiagnosisApi from "../../../api/doctor/DiagnosisApi";

const DiagnosisPage = () => (
  <BaseCrudPage
    title="Diagnosiss"
    service={DiagnosisApi}
    fields={[
      {
        name: "diagnosisName",
        label: "Diagnosis Name",
        type: "text",
        required: true,
      },
      { name: "diagnosisDetails", label: "Diagnosis Details", type: "text" },
      { name: "diagnosisDate", label: "Date", type: "date" },
      {
        name: "consultationId",
        label: "Consultaion",
        type: "select",
        options: [],
      },
    ]}
    columns={[
      { accessorKey: "id", header: "ID" },
      { accessorKey: "diagnosisName", header: "Diagnosis" },
    { accessorKey: "diagnosisDetails", header: "Diagnosis Details" },
    { accessorKey: "consultationId", header: "Consultation" },
    { accessorKey: "diagnosisDate", header: "Date" },,
    ]}
    mapFormToPayload={(form) => ({
      diagnosisName: formData.diagnosisName,
      diagnosisDetails: formData.diagnosisDetails,
      diagnosisDate: formData.diagnosisDate,
      consultationId: Number(formData.consultationId),
    })}
  />
);

export default DiagnosisPage;
