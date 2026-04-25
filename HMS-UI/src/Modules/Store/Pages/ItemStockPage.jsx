import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemStockApi from "../../../api/store/ItemStockApi";
import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";

const ItemStockPage = () => {
  const [items, setItems] = useState([]);

  console.log("Item Stock Data: ")
  useEffect(() => {
    ItemApi.getPaged({ page: 1, pageSize: 2000 })
      .then(res => setItems(res.data.data.data));
  }, []);

  const itemOptions = items.map(i => ({
    label: i.name,
    value: i.id
  }));

  // 🔥 Clean Enum (string-based = best practice)
//   const movementOptions = [
//   { label: "IN (Purchase)", value: "Purchase"},
//   { label: "OUT (Usage)", value: "Sale" },
//   { label: "ADJUST", value: "Adjustment" },
//   { label: "RETURN", value: "Return" },
//   { label: "DAMAGE", value: "Damage" },
// ];

const movementOptions = [
  { label: "Purchase", value: 1 },
  { label: "Sale", value: 2 },
  { label: "Adjustment", value: 3 },
  { label: "Return", value: 4 },
  { label: "Damage", value: 5 },
];


const mapEntityToForm = (item) => ({
  ...item,
  type: movementOptions.find(x => x.label === item.type)?.value ?? item.type,
});

  return (
    <BaseCrudPage
      title="Item Stock"
      service={ItemStockApi}

      // 🧾 FORM FIELDS
      fields={[
        {
          name: "itemId",
          label: "Item",
          type: "select",
          options: itemOptions,
          required: true
        },

        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: true
        },

        {
          name: "type",
          label: "Movement Type",
          type: "select",
          options: movementOptions,
          required: true
        },

        {
          name: "batchNumber",
          label: "Batch Number",
          type: "text"
        },

        {
          name: "expiryDate",
          label: "Expiry Date",
          type: "date"
        },

        {
          name: "notes",
          label: "Notes",
          type: "textarea"
        },
      ]}

      // 📊 TABLE
      columns={[
        { accessorKey: "id", header: "ID" },

        { accessorKey: "itemName", header: "Item" },

        {
          accessorKey: "quantity",
          header: "Quantity",
          cell: (info) => {
            const val = info.getValue();

            if (val > 50)
              return <span className="text-green-600 font-bold">{val}</span>;

            if (val > 10)
              return <span className="text-yellow-600 font-bold">{val}</span>;

            return <span className="text-red-600 font-bold">{val}</span>;
          }
        },

        { accessorKey: "type", header: "Type" },

        { accessorKey: "date", header: "Date" },

        { accessorKey: "batchNumber", header: "Batch" },

        { accessorKey: "expiryDate", header: "Expiry" },

        { accessorKey: "notes", header: "Notes" },
      ]}

      mapEntityToForm={mapEntityToForm}  

      // 🔄 FORM TO API PAYLOAD
      mapFormToPayload={(form) => ({
        itemId: Number(form.itemId),
        quantity: Number(form.quantity),
        type: Number(form.type), 
        batchNumber: form.batchNumber || null,
        expiryDate: form.expiryDate || null,
        notes: form.notes || null,
      })}
    />
  );
};

export default ItemStockPage;