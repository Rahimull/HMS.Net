
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import SuplierApi from "../../../api/store/SuplierApi";

const SuplierPage = () => (
  <BaseCrudPage
    title="Suppliers"
    service={SuplierApi}
    fields={[
      {
        name: "name",
        label: "Name [*,  🔑]",
        type: "text",
        required: true,
        maxLength: 100,
        placeholder:"Suppliers Name"
      },
      {
        name: "contactInfo",
        label: "Contact Information *",
        type: "text",
        placeholder: "Phone / Email",
        maxLength: 50,
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
      },
    ]}
    columns={[
      { accessorKey: "name", header: "Name", enableSorting: true },
      { accessorKey: "contactInfo", header: "Contact Info" },
      { accessorKey: "address", header: "Address" },
    ]}
    mapFormToPayload={(form) => ({
      name: form.name,
      contactInfo: form.contactInfo,
      address: form.address,
    })}
  />
);

export default SuplierPage;
