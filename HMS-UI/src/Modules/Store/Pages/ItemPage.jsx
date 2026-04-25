
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemApi from "../../../api/store/ItemApi";

const categoryOptions = [
  {"Tablet": "Tablet"},
  {"Syrup": "Syrup"},
  {"Injection": "Injection"},
  {"Equipment": "Equipment"},
]

const ItemPage = () => (
  

  <BaseCrudPage
    title="Item"
    service={ItemApi}
    fields={[
      { name: "name", label: "Name", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: categoryOptions },
      { name: "unit", label: "Unit", type: "text", required:true },
      { name: "price", label: "Price", type: "number" },
      { name: "quantityInStock", label: "Quantity In Stock", type: "number"},
      { name: "description", label: "Description", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Name", enableSorting: true },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "unit", header: "Unit" },
      { accessorKey: "price", header: "Price", cell: (info)=> `${info.getValue()} af` },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "quantityInStock", header: "Stock", cell: (info)=> {
        const value = info.getValue();
        return (
          <span className={value < 10 ? "text-red-500 font-bold" : ""}>{value}</span>
        )
      } },
    ]}

    mapFormToPayload={(form) => ({...form})}
    // mapFormToPayload={(form) => ({
    //   name: form.name,
    //   quantityInStock: form.quantityInStock,
    //   unit: form.unit,
    //   price: form.price,
    //   description: form.description,
    //   category: form.category,
    // })}
  />
);

export default ItemPage;