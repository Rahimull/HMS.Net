import { useState } from "react";
import DepartemnApi from "../api/DepartmentApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const DepartmentPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(DepartemnApi);
  const [editing, setEditing] = useState(null);



// Handle Create and Update
  const handleSubmit = (formData) => {
    const payload = {
      name: formData.name,
      description: formData.description,
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };


// Every Field for the Create and Update
  const departmentFields = [
    { name: "name", label: "Department Name", type: "text", required: true },
    
    { name: "description", label: "Description", type: "textarea" },
  
  ];


  // Every Field for Select
  const departmentColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Department name" },
    { key: "description", label: "Description" },
  ];


  return (
    <Layout>
      <ReusableForm
        fields={departmentFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update department" : "Add department"}
      />
      <DataTable
        columns={departmentColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default DepartmentPage;
