import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import UnitApi from "../../../api/Common/UnitApi";

const UnitPage = () => {
  return (
    <>
      <BaseCrudPage
        title="Unit"
        tableTitle="Unit Table"
        service={UnitApi}
        fields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
        ]}
        columns={[
          { accessorKey: "id", header: "ID", enableSorting: true },
          { accessorKey: "name", header: "Name", enableSorting: true },
        ]}
        mapFormToPayload={(form) => ({
          name: form.name,
        })}
      />
    </>
  );
};

export default UnitPage;
