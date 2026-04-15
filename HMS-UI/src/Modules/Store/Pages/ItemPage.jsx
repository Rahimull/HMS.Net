
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemApi from "../../../api/store/ItemApi";
const ItemPage = () => (
  

  <BaseCrudPage
    title="Item"
    service={ItemApi}
    fields={[
      { name: "name", label: "Name", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "unit", label: "Uint", type: "text", requiredd:true },
      { name: "price", label: "Price", type: "number" },
      { name: "quantityInStock", label: "Quantity In Stock", type: "number"},
      { name: "description", label: "Description", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Name", enableSorting: true },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "unit", header: "Unit" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "quantityInStock", header: "Quantity In Stock " },
    ]}
    mapFormToPayload={(form) => ({
      name: form.name,
      quantityInStock: form.quantityInStock,
      unit: form.unit,
      price: form.price,
      description: form.description,
      category: form.category,
    })}
  />
);

export default ItemPage;