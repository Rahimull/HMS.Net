
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemStockApi from "../../../api/store/ItemStockApi";
const ItemStockPage = () => (
  

  <BaseCrudPage
    title="ItemStock"
    service={ItemStockApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "ItemStockDate", label: "ItemStock Date", type: "date" },
      { name: "ItemStockTime", label: "ItemStock Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "ItemStockDate", header: "Date" },
      { accessorKey: "ItemStockTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      ItemStockDate: form.ItemStockDate,
      ItemStockTime: form.ItemStockTime,
      notes: form.notes,
    })}
  />
);

export default ItemStockPage;