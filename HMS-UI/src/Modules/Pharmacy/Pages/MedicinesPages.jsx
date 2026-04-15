
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicinesApi from "../../../api/pharmacy/MedicinesApi";
const MedicinesPage = () => (
  

  <BaseCrudPage
    title="Medicines"
    service={MedicinesApi}
    fields={[
      { name: "patientId", label: "Patients", type: "select", required: true },
      { name: "doctorId", label: "Doctors", type: "select" },
      { name: "MedicinesDate", label: "Medicines Date", type: "date" },
      { name: "MedicinesTime", label: "Medicines Time", type: "time" },
      { name: "notes", label: "select Gender", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "patientId", header: "Patient", enableSorting: true },
      { accessorKey: "doctorId", header: "Doctors" },
      { accessorKey: "MedicinesDate", header: "Date" },
      { accessorKey: "MedicinesTime", header: "Time" },
      { accessorKey: "notes", header: "Notes" },
    ]}
    mapFormToPayload={(form) => ({
      patientId: form.patientId,
      doctorId: form.doctorId,
      MedicinesDate: form.MedicinesDate,
      MedicinesTime: form.MedicinesTime,
      notes: form.notes,
    })}
  />
);

export default MedicinesPage;