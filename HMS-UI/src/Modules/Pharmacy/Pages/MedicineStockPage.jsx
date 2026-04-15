
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicineStockApi from "../../../api/pharmacy/MedicineStockApi";
const MedicineStockPage = () => (
  

  <BaseCrudPage
    title="MedicineStock"
    service={MedicineStockApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "MedicineStockDate", label: "MedicineStock Date", type: "date" },
      { name: "MedicineStockTime", label: "MedicineStock Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "MedicineStockDate", header: "Date" },
      { accessorKey: "MedicineStockTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      MedicineStockDate: form.MedicineStockDate,
      MedicineStockTime: form.MedicineStockTime,
      notes: form.notes,
    })}
  />
);

export default MedicineStockPage;