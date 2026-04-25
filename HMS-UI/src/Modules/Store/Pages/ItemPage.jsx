
import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ItemApi from "../../../api/store/ItemApi";
import { useEffect, useState } from "react";
import UnitApi from "@/api/Common/UnitApi";
import CategoryApi from "@/api/Common/Category";


const ItemPage = () => {

  const [units, setUnits] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(()=>{
      UnitApi.getPaged({page: 1, pageSize:1000}).then(res=> setUnits(res.data.data.data))
      CategoryApi.getPaged({page: 1, pageSize:1000}).then(res=> setCategory(res.data.data.data))
  },[])

  const categoryOptions = category.map((c)=>(
    {
    label: c.name,
    value: c.id,
  }
  ));
  const unitsOptions = units.map((c)=>(
    {
    label: c.name,
    value: c.id,
  }
  ));

  const itemTypeOptions = [
  { label: "Medicine", value: 1 },
  { label: "Equipment", value: 2 },
  { label: "Consumable", value: 3 },
  { label: "Service", value: 4 },
];

const mapEntityToForm = (item) => ({
  ...item,
  type: itemTypeOptions.find(x => x.label === item.type)?.value ?? item.type,
});

  return(
    <BaseCrudPage
  title="Item"
  service={ItemApi}
  fields={[
    { name: "name", label: "Name", type: "text", required: true },
    { name: "categoryId", label: "Category", type: "select", options: categoryOptions },
    { name: "unitId", label: "Unit", type: "select", options: unitsOptions },
    { name: "type", label: "type", type: "select", options: itemTypeOptions },
    { name: "price", label: "Price", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ]}

  columns={[
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "categoryName", header: "Category" },
    { accessorKey: "unitName", header: "Unit" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "price", header: "Price", cell: (info) => `${info.getValue()} af` },
    { accessorKey: "description", header: "Description" },
  ]}

  mapEntityToForm={mapEntityToForm}  

  mapFormToPayload={(form) => ({
    name: form.name,
    price: Number(form.price),
    type: Number(form.type),
    unitId: Number(form.unitId),
    categoryId: Number(form.categoryId),
    description: form.description,
  })}
/>
  );
};

export default ItemPage;