
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PurchaseApi from "../../../api/store/PurchaseApi";
const PurchasePage = () => (
  

  <BaseCrudPage
    title="Purchase"
    service={PurchaseApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PurchaseDate", label: "Purchase Date", type: "date" },
      { name: "PurchaseTime", label: "Purchase Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PurchaseDate", header: "Date" },
      { accessorKey: "PurchaseTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PurchaseDate: form.PurchaseDate,
      PurchaseTime: form.PurchaseTime,
      notes: form.notes,
    })}
  />
);

export default PurchasePage;