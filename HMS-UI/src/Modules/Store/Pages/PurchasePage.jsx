import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PurchaseApi from "@/api/store/PurchaseApi";
import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";
import SuplierApi from "@/api/store/SuplierApi";

const PurchasePage = () => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(()=>{
    ItemApi.getPaged({page:1, pageSize:2000}).then(res => setItems(res.data.data.data));
    SuplierApi.getPaged({page:1, pageSize:2000}).then(res => setSuppliers(res.data.data.data));
    PurchaseApi.getPaged({page:1, pageSize:2000}).then(res => setPurchases(res.data.data.data));
  },[]);

  console.log(purchases)



  const itemsOptions = items.map(i=> ({
    label: i.name,
    value: i.id
  }));

  const supplierOptions = suppliers.map(i=> ({
    label: i.name,
    value: i.id
  }));
  return (
    <BaseCrudPage
      title="Purchase"
      service={PurchaseApi}
      fields={[
        { name: "quantity", label: "Quantity", type: "number", required: true },
        { name: "totalPrice", label: "Total Price", type: "number" },
        { name: "purchaseDate", label: "Purchase Date", type: "datetime-local" },
        { name: "itemId", label: "Items", type: "select", options: itemsOptions },
        { name: "supplierId", label: "Suppliers", type: "select", options: supplierOptions },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "quantity", header: "Patient", enableSorting: true },
        { accessorKey: "totalPrice", header: "Total Price" },
        { accessorKey: "purchaseDate", header: "Date" },
        { accessorKey: "itemId", header: "Time" },
        { accessorKey: "notes", header: "Notes" },
        { accessorKey: "supplierId", header: "supplierId" },
      ]}
      mapFormToPayload={(form) => ({
        quantity: form.quantity,
        totalPrice: Number(form.totalPrice),
        purchaseDate: form.purchaseDate,
        notes: form.notes,
        itemId: Number(form.itemId),
        supplierId: Number(form.supplierId),
      })}
    />
  );
};

export default PurchasePage;
