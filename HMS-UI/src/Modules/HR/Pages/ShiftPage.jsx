
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ShiftApi from "../../../api/hr/ShiftApi";
const ShiftPage = () => (
  

  <BaseCrudPage
    title="Shift"
    service={ShiftApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "ShiftDate", label: "Shift Date", type: "date" },
      { name: "ShiftTime", label: "Shift Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "ShiftDate", header: "Date" },
      { accessorKey: "ShiftTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      ShiftDate: form.ShiftDate,
      ShiftTime: form.ShiftTime,
      notes: form.notes,
    })}
  />
);

export default ShiftPage;