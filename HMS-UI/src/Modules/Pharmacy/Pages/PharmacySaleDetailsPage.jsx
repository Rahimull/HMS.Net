
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PharmacySaleDetailsApi from "../../../api/pharmacy/PharmacySaleDetailsApi";
const PharmacySaleDetailsPage = () => (
  

  <BaseCrudPage
    title="PharmacySaleDetails"
    service={PharmacySaleDetailsApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "PharmacySaleDetailsDate", label: "PharmacySaleDetails Date", type: "date" },
      { name: "PharmacySaleDetailsTime", label: "PharmacySaleDetails Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "PharmacySaleDetailsDate", header: "Date" },
      { accessorKey: "PharmacySaleDetailsTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      PharmacySaleDetailsDate: form.PharmacySaleDetailsDate,
      PharmacySaleDetailsTime: form.PharmacySaleDetailsTime,
      notes: form.notes,
    })}
  />
);

export default PharmacySaleDetailsPage;