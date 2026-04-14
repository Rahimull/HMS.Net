
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import AppointmentApi from "../../../api/reception/AppointmentApi";
console.log(AppointmentApi);
const AppointmentPage = () => (
  

  <BaseCrudPage
    title="Appointment"
    service={AppointmentApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "appointmentDate", label: "Appointment Date", type: "date" },
      { name: "appointmentTime", label: "Appointment Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "appointmentDate", header: "Date" },
      { accessorKey: "appointmentTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      notes: form.notes,
    })}
  />
);

export default AppointmentPage;