
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import SuplierApi from "../../../api/store/SuplierApi";
const SuplierPage = () => (
  

  <BaseCrudPage
    title="Suplier"
    service={SuplierApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "SuplierDate", label: "Suplier Date", type: "date" },
      { name: "SuplierTime", label: "Suplier Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "SuplierDate", header: "Date" },
      { accessorKey: "SuplierTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      SuplierDate: form.SuplierDate,
      SuplierTime: form.SuplierTime,
      notes: form.notes,
    })}
  />
);

export default SuplierPage;