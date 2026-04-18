
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PurchaseDetailsApi from "@/api/store/PurchaseDetailsApi";
import { useEffect, useState } from "react";
import PurchaseApi from "@/api/store/PurchaseApi";
import ItemApi from "@/api/store/ItemApi";
const PurchaseDetailsPage = () => {
  const [items, setItems] = useState([]);
  const [purchase, setPurchase] = useState([]);

  useEffect(()=>{
    ItemApi.getPaged({page:1, pageSize:2000})
      .then(res=> setItems(res.data.data.data));
    PurchaseApi.getPaged({page:1, pageSize:2000})
      .then(res=> setPurchase(res.data.data.data));
  },[]);

  const itemOption = items.map(i=>({
    label: i.name,
    value: i.id
  }))
  const purchaseOption = purchase.map(p=>({
    label: p.id,
    value: p.id
  }))

  console.log("Purchase ",purchaseOption)
  return(
    <BaseCrudPage
    title="PurchaseDetails"
    service={PurchaseDetailsApi}
    fields={[
      { name: "quantity", label: "Quantity", type: "number", required: true },
      { name: "unitPrice", label: "Unit Price", type: "number" },
      { name: "subTotal", label: "Sub Total Date", type: "number" },
      { name: "batchNumber", label: "Batch Number Time", type: "text" },
      { name: "expiryDate", label: "Expatir Date", type: "date"},
      { name: "purchaseId", label: "Purchase", type: "select", options: purchaseOption},
      { name: "itemId", label: "Item", type: "select", options: itemOption},
    ]}
    columns={[
      { accessorKey: "id", header: "ID", enableSorting: true },
      { accessorKey: "quantity", header: "Quantity", enableSorting: true },
      { accessorKey: "unitPrice", header: "Unit Price" },
      { accessorKey: "subTotal", header: "Sub Total" },
      { accessorKey: "batchNumber", header: "Batch Number" },
      { accessorKey: "expiryDate", header: "Expiry Date" },
      { accessorKey: "purchaseId", header: "Purchase" },
      { accessorKey: "itemId", header: "Item" },
    ]}
    mapFormToPayload={(form) => ({
      quantity: Number(form.quantity),
      unitPrice: Number(form.unitPrice),
      subTotal: Number(form.subTotal),
      expiryDate: form.expiryDate,
      purchaseId: Number(form.purchaseId),
      itemId: Number(form.itemId),
    })}
  />
  );
};

export default PurchaseDetailsPage;