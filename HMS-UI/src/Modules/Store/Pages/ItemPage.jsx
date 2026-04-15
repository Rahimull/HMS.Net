
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemApi from "../../../api/store/ItemApi";
const ItemPage = () => (
  

  <BaseCrudPage
    title="Item"
    service={ItemApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "ItemDate", label: "Item Date", type: "date" },
      { name: "ItemTime", label: "Item Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "ItemDate", header: "Date" },
      { accessorKey: "ItemTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      ItemDate: form.ItemDate,
      ItemTime: form.ItemTime,
      notes: form.notes,
    })}
  />
);

export default ItemPage;