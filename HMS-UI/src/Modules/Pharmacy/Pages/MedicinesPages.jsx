
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicinesApi from "../../../api/pharmacy/MedicinesApi";
const MedicinesPage = () => (
  

  <BaseCrudPage
    title="Medicines"
    service={MedicinesApi}
    fields={[
      { name: "name", label: "Name", type: "text", required: true },
      { name: "genericName", label: "Generic Name", type: "text" },
      { name: "unit", label: "Uint", type: "text", requiredd:true },
      { name: "price", label: "Price", type: "number" },
      { name: "stockQuantity", label: "Stock Quantity", type: "number"},
      { name: "description", label: "Description", type: "textarea"},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "name", header: "Name", enableSorting: true },
      { accessorKey: "genericName", header: "GenericName" },
      { accessorKey: "unit", header: "Unit" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "stockQuantity", header: "Stock Quantity" },
    ]}
    mapFormToPayload={(form) => ({
      name: form.name,
      genericName: form.genericName,
      unit: form.unit,
      price: form.price,
      description: form.description,
      stockQuantity: form.stockQuantity,
    })}
  />
);

export default MedicinesPage;