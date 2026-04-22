import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemStockApi from "../../../api/store/ItemStockApi";
import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";
import Card from "@/components/common/Card";
const ItemStockPage = () => {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    ItemApi.getPaged({page:1, pageSize:2000})
      .then(res => setItems(res.data.data.data));
  },[]);
  
  const itemOptinos = items.map(i=>({
    label: i.name,
    value: i.id
  }));

  return (
    <>
    
    <BaseCrudPage
      title="Item Stock"
      service={ItemStockApi}
      fields={[
        { name: "quantity", label: "quantity", type: "number", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        {
          name: "batchNumber",
          label: "Batch Number",
          type: "text",
          required: true,
        },
        { name: "expiryDate", label: "Expair Date", type: "date" },
        { name: "itemId", label: "Items", type: "select", options: itemOptinos },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "itemName", header: "Item", enableSorting: true },
        { accessorKey: "quantity", header: "Quantity", enableSorting: true },
        { accessorKey: "location", header: "Location" },
        { accessorKey: "batchNumber", header: "Batch Number" },
        { accessorKey: "lastUpdated", header: "Last Update" },
        { accessorKey: "expiryDate", header: "Expiry Date" },
      ]}
      mapFormToPayload={(form) => ({
        quantity: Number(form.quantity),
        location: form.location,
        batchNumber: form.batchNumber,
        expiryDate: form.expiryDate,
        itemId: Number(form.itemId),
      })}
    />
    </>
  );
};

export default ItemStockPage;
