
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PurchaseDetailsApi from "../../../api/store/PurchaseDetailsApi";
const PurchaseDetailsPage = () => (
  

  <BaseCrudPage
    title="PurchaseDetails"
    service={PurchaseDetailsApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PurchaseDetailsDate", label: "PurchaseDetails Date", type: "date" },
      { name: "PurchaseDetailsTime", label: "PurchaseDetails Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PurchaseDetailsDate", header: "Date" },
      { accessorKey: "PurchaseDetailsTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PurchaseDetailsDate: form.PurchaseDetailsDate,
      PurchaseDetailsTime: form.PurchaseDetailsTime,
      notes: form.notes,
    })}
  />
);

export default PurchaseDetailsPage;