import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import SaleDetailsApi from "@/api/pharmacy/SaleDetailsApi";
import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";
import SaleApi from "@/api/pharmacy/SaleApi";
const SaleDetailsPage = () => {
  const [Items, setItems] = useState([]);
  const [Sale, setSale] = useState([]);
  useEffect(() => {
    ItemApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setItems(res.data.data.data));
    
    SaleApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setSale(res.data.data.data));
  }, []);

  const ItemOptions = Items.map((m) => ({
    label: m.name,
    value: m.id,
  }));
  const SaleOptions = Sale.map((m) => ({
    label: m.id,
    value: m.id,
  }));


  return (
    <BaseCrudPage
      title="SaleDetails"
      service={SaleDetailsApi}
      fields={[
        {
          name: "batchNumber",
          label: "batch Number",
          type: "text",
          required: true,
        },
        { name: "quantity", label: "Qunatity", type: "number" },
        { name: "unitPrice", label: "Unit Price", type: "number" },
        { name: "totalPrice", label: "Totale Price", type: "number" },
        {
          name: "SaleId",
          label: "Pharmacy Sale",
          type: "select",
          options: SaleOptions,
        },
        { name: "ItemId", label: "Item", type: "select", options: ItemOptions },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        {
          accessorKey: "batchNumber",
          header: "Batch Number",
          enableSorting: true,
        },
        { accessorKey: "quantity", header: "Quantity" },
        { accessorKey: "unitPrice", header: "Unit Price" },
        { accessorKey: "totalPrice", header: "Total Price" },
        { accessorKey: "SaleId", header: "Pharmacy Sale" },
        { accessorKey: "ItemId", header: "Item" },
      ]}
      mapFormToPayload={(form) => ({
        batchNumber: form.batchNumber,
        quantity: form.quantity,
        unitPrice: form.unitPrice,
        totalPrice: form.totalPrice,
        SaleId: form.SaleId,
        ItemId: form.ItemId,
      })}
    />
  );
};

export default SaleDetailsPage;
