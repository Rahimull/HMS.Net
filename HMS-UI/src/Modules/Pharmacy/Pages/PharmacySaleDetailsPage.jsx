import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PharmacySaleDetailsApi from "@/api/pharmacy/PharmacySaleDetailsApi";
import { useEffect, useState } from "react";
import MedicinesApi from "@/api/pharmacy/MedicinesApi";
import PharmacySaleApi from "@/api/pharmacy/PharmacySaleApi";
const PharmacySaleDetailsPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [pharmacySale, setPharmacySale] = useState([]);
  useEffect(() => {
    MedicinesApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setMedicines(res.data.data.data));
    PharmacySaleApi.getPaged({ page: 1, pageSize: 2000 }).then((res) =>
      setPharmacySale(res.data.data.data));
  }, []);

  const medicineOptions = medicines.map((m) => ({
    label: m.name,
    value: m.id,
  }));
  const PharmacySaleOptions = pharmacySale.map((m) => ({
    label: m.id,
    value: m.id,
  }));


  return (
    <BaseCrudPage
      title="PharmacySaleDetails"
      service={PharmacySaleDetailsApi}
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
          name: "pharmacySaleId",
          label: "Pharmacy Sale",
          type: "select",
          options: PharmacySaleOptions,
        },
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
        { accessorKey: "unitPrice", header: "Unit Price" },
        { accessorKey: "totalPrice", header: "Total Price" },
        { accessorKey: "pharmacySaleId", header: "Pharmacy Sale" },
        { accessorKey: "medicineId", header: "Medicine" },
      ]}
      mapFormToPayload={(form) => ({
        batchNumber: form.batchNumber,
        quantity: form.quantity,
        unitPrice: form.unitPrice,
        totalPrice: form.totalPrice,
        pharmacySaleId: form.pharmacySaleId,
        medicineId: form.medicineId,
      })}
    />
  );
};

export default PharmacySaleDetailsPage;
