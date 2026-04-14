
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import DoctorApi from "../../../api/doctor/DoctorApi";

const DoctorPage = () => (
  <BaseCrudPage
    title="Doctors"
    service={DoctorApi}
    fields={[
      {
      name: "firstName",
      label: "First Name",
      type: "Text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "specialization",
      label: "Specialization",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "fee",
      label: "Fee",
      type: "number",
    },
    { name: "isActive", label: "Is Active", type: "checkbox" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "departmentId", label: "Department Name", type: "select", 
        option:""
    },
    ]}
    columns={[
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "specialization", header: "Specialization" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "isActive", header: "Is Active" },
      { accessorKey: "fee", header: "Fee" },
      { accessorKey: "phoneNumber", header: "Phone Number" },
      { accessorKey: "departmentName", header: "Department" },
    ]}

    mapFormToPayload={(form) => ({
      firstName: form.firstName,
      lastName: form.lastName,
      specialization: form.specialization,
      email: form.email,
      fee: form.fee,
      phoneNumber: form.phoneNumber,
      departmentName: form.departmentName,
    })}
  />
);

export default DoctorPage;