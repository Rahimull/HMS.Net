import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import CurrentStockApi from "@/api/store/CurrentStockApi";
import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";

const CurrentStockPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ItemApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setItems(res.data.data.data),
    );
     }, []);

  const itemOptions = items.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <BaseCrudPage
      title="Current Stock"
      service={CurrentStockApi}
      fields={[
        { name: "quantity", label: "Quantity", type: "number", required: true },
        {
          name: "itemId",
          label: "Items",
          type: "select",
          options: itemOptions,
        }
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "itemName", header: "Item" },
        { accessorKey: "quantity", header: "Quantity", enableSorting: true },
        { accessorKey: "lastUpdate", header: "Last Update", enableSorting: true },
      ]}
      mapFormToPayload={(form) => ({
        itemId: Number(form.itemId),
        quantity: Number(form.quantity),
      })}
    />
  );
};

export default CurrentStockPage;
