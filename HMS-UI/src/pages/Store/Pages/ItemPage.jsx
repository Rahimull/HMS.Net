import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemApi from "../../../api/store/ItemApi";
import { useEffect, useMemo, useState } from "react";
import UnitApi from "@/api/Common/UnitApi";
import CategoryApi from "@/api/Common/Category";

const ItemPage = () => {
  const [units, setUnits] = useState([]);
  const [category, setCategory] = useState([]);

  /* =========== SEARCH AND FILTERING ======= */
  const [statusFilter, setStatusFilter] = useState("all");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ================= FILTER DATA ================= */
  const filters = useMemo(
    () => ({
      status: statusFilter,
      fromDate,
      toDate,
    }),
    [statusFilter, fromDate, toDate],
  );

  useEffect(() => {
    UnitApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setUnits(res.data.data.data),
    );
    CategoryApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setCategory(res.data.data.data),
    );
  }, []);

  const categoryOptions = category.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const unitsOptions = units.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const itemTypeOptions = [
    { label: "Medicine", value: 1 },
    { label: "Equipment", value: 2 },
    { label: "Consumable", value: 3 },
    { label: "Service", value: 4 },
  ];

  const mapEntityToForm = (item) => ({
    ...item,
    type:
      itemTypeOptions.find((x) => x.label === item.type)?.value ?? item.type,
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BaseCrudPage
        title="Item"
        filters={filters}
        service={ItemApi}
        fields={[
          {
            name: "barcode",
            label: "Barcode *",
            type: "text",
            placeholder: "Scan Barcode...",
            autoFocus: true,
            required: true,
          },
          { name: "name", label: "Name *", type: "text", required: true
           },
          { name: "genericName", label: "Generic Name", type: "text" },
          { name: "brandName", label: "Brand Name", type: "text" },

          {
            name: "categoryId",
            label: "Category *",
            type: "select",
            required: true,
            options: categoryOptions,
          },
          {
            name: "unitId",
            label: "Unit *",
            type: "select",
            options: unitsOptions,
            required: true,
          },
          {
            name: "type",
            label: "type *",
            type: "select",
            options: itemTypeOptions,
            required: true,
          },
          { name: "isActive", label: "Is Active *", type: "checkbox"},

          { name: "description", label: "Description", type: "textarea" },
        ]}
        columns={[
          { accessorKey: "id", header: "ID", enableSorting: true },
          { accessorKey: "name", header: "Name", enableSorting: true },
          {
            accessorKey: "brandName",
            header: "Brand Name",
            enableSorting: true,
          },
          { accessorKey: "code", header: "Code", enableSorting: true },
          { accessorKey: "barcode", header: "Barcode" },
          { accessorKey: "categoryName", header: "Category" },
          { accessorKey: "unitName", header: "Unit" },
          { accessorKey: "type", header: "Type" },
          { accessorKey: "isActive", header: "isActive" },
          { accessorKey: "description", header: "Description" },
        ]}
        tableTitle={"Items List"}
        tableSubTitle={"Pharmacy Items Record"}
        mapEntityToForm={mapEntityToForm}
        mapFormToPayload={(form) => ({
          id: form.id,
          name: form.name,
          genericName: form.genericName,
          brandName: form.brandName,
          code: form.code,
          barcode: form.barcode,
          type: Number(form.type),
          unitId: Number(form.unitId),
          categoryId: Number(form.categoryId),
          description: form.description,
        })}
      />
    </div>
  );
};

export default ItemPage;
