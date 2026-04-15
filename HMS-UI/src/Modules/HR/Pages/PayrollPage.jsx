
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PayrollApi from "../../../api/hr/PayrollApi";
const PayrollPage = () => (
  

  <BaseCrudPage
    title="Payroll"
    service={PayrollApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PayrollDate", label: "Payroll Date", type: "date" },
      { name: "PayrollTime", label: "Payroll Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PayrollDate", header: "Date" },
      { accessorKey: "PayrollTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PayrollDate: form.PayrollDate,
      PayrollTime: form.PayrollTime,
      notes: form.notes,
    })}
  />
);

export default PayrollPage;