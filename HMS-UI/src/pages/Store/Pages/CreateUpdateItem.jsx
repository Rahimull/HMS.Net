import CategoryApi from "@/api/Common/Category";
import UnitApi from "@/api/Common/UnitApi";
import Button from "@/components/common/Button";
import CrudFormModal from "@/components/modal/CrudFormModal";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import CreateUpdateCategory from "@/Modules/Common/Pages/CreateUpdateCategory";
import CreateUpdateUnit from "@/Modules/Common/Pages/CreateUpdateUnit";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const CreateUpdateItem = ({ curd }) => {
  const [units, setUnits] = useState([]);
  const [category, setCategory] = useState([]);
  const unitCrud = useCreatUpdateForm(UnitApi);
  const CategoryCrud = useCreatUpdateForm(CategoryApi);

  useEffect(() => {
    UnitApi.getPaged({ pagination:{
        pageSize:1000,
        pageIndex:0
    } }).then((res) =>
      setUnits(res.data.data.data),
    );
    CategoryApi.getPaged({ pagination:{
        pageSize: 1000,
        pageIndex: 0
    } }).then((res) =>
      setCategory(res.data.data.data),
    );
  }, [unitCrud.refreshKey, CategoryCrud.refreshKey]);

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

  

  const fields = [
    {
      name: "barcode",
      label: "Barcode [*,  🔑]",
      type: "text",
      placeholder: "Scan Barcode...",
      autoFocus: true,
      required: true,
    },
    {
      name: "name",
      label: "Name [*,  🔑]",
      type: "text",
      required: true,
      placeholder: "Item Name",
    },
    {
      name: "genericName",
      label: "Generic Name",
      type: "text",
      placeholder: "Item Gendric Name",
    },
    {
      name: "brandName",
      label: "Brand Name",
      type: "text",
      placeholder: "Brand Name",
    },

    {
      name: "categoryId",
      label: "Category *",
      type: "select",
      required: true,
      options: categoryOptions,
      endAdornment:(
        <Button 
            size="md"
            type="button"
            variant="outline"
            onClick={CategoryCrud.openCreate}
        >
            <Plus size={16} />
        </Button>
      )
    },
    {
      name: "unitId",
      label: "Unit *",
      type: "select",
      options: unitsOptions,
      required: true,
      endAdornment: (
        <Button
          size="md"
          type="button"
          variant="outline"
          onClick={unitCrud.openCreate}
        >
          <Plus size={16} />
        </Button>
      ),
    },
    {
      name: "type",
      label: "type *",
      type: "select",
      options: itemTypeOptions,
      required: true,
    },
    { name: "isActive", label: "Is Active", type: "checkbox" },

    { name: "description", label: "Description", type: "textarea" },
  ];

  return (
    <>
      <CrudFormModal
        open={curd.openModal}
        onClose={curd.closeModal}
        title={curd.editing ? "Edit Item" : "Add Item"}
        onSubmit={curd.handleSubmit}
        loading={curd.loading}
        submitText={curd.editing ? "Update Item" : "Add Item"}
        initialValues={curd.editing}
        fields={fields}
      />

      
        <CreateUpdateUnit curd={unitCrud} />
     
     
        <CreateUpdateCategory curd={CategoryCrud} />
      
    </>
  );
};

export default CreateUpdateItem;
