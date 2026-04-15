
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import InvoiceApi from "../../../api/finance/InvoiceApi";
const InvoicePage = () => (
  

  <BaseCrudPage
    title="Invoice"
    service={InvoiceApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "InvoiceDate", label: "Invoice Date", type: "date" },
      { name: "InvoiceTime", label: "Invoice Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "InvoiceDate", header: "Date" },
      { accessorKey: "InvoiceTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      InvoiceDate: form.InvoiceDate,
      InvoiceTime: form.InvoiceTime,
      notes: form.notes,
    })}
  />
);

export default InvoicePage;