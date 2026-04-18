
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PurchaseDetailsApi from "../../../api/store/PurchaseDetailsApi";
import { useEffect } from "react";
const PurchaseDetailsPage = () => {
  const [items, setItems] = useStat([]);
  const [purchase, setPurchase] = useStat([]);

  useEffect()
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
      { name: "purchaseId", label: "Purchase", type: "select", options:[]},
      { name: "itemId", label: "Item", type: "select": options:[]},
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
      quantity: form.quantity,
      unitPrice: form.unitPrice,
      subTotal: form.subTotal,
      batchNumber: form.batchNumber,
      expiryDate: form.expiryDate,
      purchaseId: form.purchaseId,
      itemId: form.itemId,
    })}
  />
  );
};

export default PurchaseDetailsPage;