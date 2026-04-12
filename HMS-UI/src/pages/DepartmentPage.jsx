
import BaseCrudPage from "./Template/BaseCrudPage";
import DepartmentApi from "../api/DepartmentApi";

const DepartmentPage = () => (
  <BaseCrudPage
    title="Departments"
    service={DepartmentApi}
    fields={[
      { name: "name", label: "Department Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Department Name", enableSorting: true },
      { accessorKey: "description", header: "Description" },
    ]}
    mapFormToPayload={(form) => ({
      name: form.name,
      description: form.description,
    })}
  />
);

export default DepartmentPage;