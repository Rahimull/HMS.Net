


import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import EmployeeApi from "../../../api/hr/EmployeeApi";
const EmployeePage = () => (
  

  <BaseCrudPage
    title="Employeet"
    service={EmployeeApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "EmployeetDate", label: "Employeet Date", type: "date" },
      { name: "EmployeetTime", label: "Employeet Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "EmployeetDate", header: "Date" },
      { accessorKey: "EmployeetTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      EmployeetDate: form.EmployeetDate,
      EmployeetTime: form.EmployeetTime,
      notes: form.notes,
    })}
  />
);

export default EmployeePage;