import { useState } from "react";
import PatientApi from "../api/PatientApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Form from "../components/form/Form";
import Layout from "../components/layout/Layout";

const PatientPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(PatientApi);
  const [editing, setEditing] = useState(null);

  const fields = [
    { name: "name", label: "Name" },
    { name: "age", label: "Age" },
  ];

  const handleSubmit = (formData) => {
    if (editing) {
      updateItem(editing.id, formData);
      setEditing(null);
    } else {
      createItem(formData);
    }
  };

  return (
    <Layout>
      <Form fields={fields} onSubmit={handleSubmit} initialValues={editing || {}} />

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "age", label: "Age" },
        ]}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default PatientPage;