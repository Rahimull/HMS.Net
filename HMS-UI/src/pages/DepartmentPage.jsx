import { useState } from "react";
import Loader from "../components/common/Loader";
import DepartemnApi from "../api/DepartmentApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const DepartmentPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(DepartemnApi);

  const [editing, setEditing] = useState(null);

  // Submit (Create / Update)
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

  // Form Fields
  const departmentFields = [
    { name: "name", label: "Department Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
  ];

  // Table Columns
  const departmentColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Department Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={departmentFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Department" : "Add Department"}
      />

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Loader or Table */}
      {loading ? (
        <Loader text="Fetching Departments..." />
      ) : (
        <DataTable
          columns={departmentColumns}
          data={data}
          onEdit={setEditing}
          onDelete={deleteItem}
        />
      )}
    </Layout>
  );
};

export default DepartmentPage;
