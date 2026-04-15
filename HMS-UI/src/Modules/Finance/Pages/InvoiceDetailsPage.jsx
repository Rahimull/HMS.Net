
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import InvoiceDetailsApi from "../../../api/finance/InvoiceDetailsApi";
console.log(InvoiceDetailsApi);
const InvoiceDetailsPage = () => (
  

  <BaseCrudPage
    title="InvoiceDetails"
    service={InvoiceDetailsApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "InvoiceDetailsDate", label: "InvoiceDetails Date", type: "date" },
      { name: "InvoiceDetailsTime", label: "InvoiceDetails Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "InvoiceDetailsDate", header: "Date" },
      { accessorKey: "InvoiceDetailsTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      InvoiceDetailsDate: form.InvoiceDetailsDate,
      InvoiceDetailsTime: form.InvoiceDetailsTime,
      notes: form.notes,
    })}
  />
);

export default InvoiceDetailsPage;