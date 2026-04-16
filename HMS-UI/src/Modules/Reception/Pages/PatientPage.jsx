
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PatientApi from "../../../api/reception/PatientApi";
const PatientPage = () => (
  

  <BaseCrudPage
    title="Patient"
    service={PatientApi}
    fields={[
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "gender", label: "Gender", type: "select", options: [
        {label:"Male", value:1},
        {label: "Female", value: 2}
      ]  },
      { name: "dob", label: "Date Of Birth", type: "date" },
      { name: "phone", label: "Phone", type: "text"},
      { name: "address", label: "Address", type: "textarea"},
      { name: "nationalId", label: "National ID", type: "text"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "firstName", header: "First Name", enableSorting: true },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "dob", header: "DOB" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "nationalId", header: "National ID" },
    ]}
    mapFormToPayload={(form) => ({
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      dob: form.dob,
      phone: form.phone,
      address: form.address,
      nationalId: form.nationalId,
    })}
  />
);

export default PatientPage;