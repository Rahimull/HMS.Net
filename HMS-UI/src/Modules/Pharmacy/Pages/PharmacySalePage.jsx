
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PharmacySaleApi from "../../../api/pharmacy/PharmacySaleApi";
const PharmacySalePage = () => (
  

  <BaseCrudPage
    title="PharmacySale"
    service={PharmacySaleApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PharmacySaleDate", label: "PharmacySale Date", type: "date" },
      { name: "PharmacySaleTime", label: "PharmacySale Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PharmacySaleDate", header: "Date" },
      { accessorKey: "PharmacySaleTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PharmacySaleDate: form.PharmacySaleDate,
      PharmacySaleTime: form.PharmacySaleTime,
      notes: form.notes,
    })}
  />
);

export default PharmacySalePage;