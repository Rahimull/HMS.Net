import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import CategoryApi from "@/api/Common/Category";

const CategoryPage = () => {
  return (
    <>
      <BaseCrudPage
        title="Category"
        tableTitle="Category Table"
        service={CategoryApi}
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

export default CategoryPage;
