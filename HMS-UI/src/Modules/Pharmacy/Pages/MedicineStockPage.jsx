import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import MedicineStockApi from "@/api/pharmacy/MedicineStockApi";
import { useEffect, useState } from "react";
import MedicinesApi from "@/api/pharmacy/MedicinesApi";
const MedicineStockPage = () => {
  const [medicines, setMedicines] = useState([]);
  useEffect(()=>{
    MedicinesApi.getPaged({page:1, pageSize:2000})
      .then(res=> setMedicines(res.data.data.data));
  },[])

  const medicineOptions = medicines.map(m=>({
    label: m.name,
    value: m.id
  }));

  return (
    <BaseCrudPage
      title="Medicine Stock"
      service={MedicineStockApi}
      fields={[
        {
          name: "batchNumber",
          label: "Batch Number",
          type: "text",
          required: true,
        },
        { name: "quantity", label: "Qunatity", type: "number" },
        { name: "expiryDate", label: "Expiry Date", type: "date" },
        { name: "location", label: "Location", type: "text" },
        { name: "medicineId", label: "Medicine", type: "select", options: medicineOptions },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        {
          accessorKey: "batchNumber",
          header: "Batch Number",
          enableSorting: true,
        },
        { accessorKey: "quantity", header: "Quantity" },
        { accessorKey: "expiryDate", header: "Expiry Date" },
        { accessorKey: "location", header: "location" },
        { accessorKey: "medicineId", header: "MedicineId" },
      ]}
      mapFormToPayload={(form) => ({
        batchNumber: form.batchNumber,
        quantity: form.quantity,
        expiryDate: form.expiryDate,
        location: form.location,
        medicineId: form.medicineId,
      })}
    />
  );
};

export default MedicineStockPage;
