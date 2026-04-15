
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PaymentApi from "../../../api/finance/PaymentApi";
const PaymentPage = () => (
  

  <BaseCrudPage
    title="Payment"
    service={PaymentApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PaymentDate", label: "Payment Date", type: "date" },
      { name: "PaymentTime", label: "Payment Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PaymentDate", header: "Date" },
      { accessorKey: "PaymentTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PaymentDate: form.PaymentDate,
      PaymentTime: form.PaymentTime,
      notes: form.notes,
    })}
  />
);

export default PaymentPage;