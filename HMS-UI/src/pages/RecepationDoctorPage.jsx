import { useEffect, useState } from "react";
import ReceptionDoctorApi from "../api/ReceptionDoctorApi";
import DepartmentApi from "../api/DepartmentApi";
import useCrud from "../hooks/useCurd";
import DataTable from "../components/common/DataTable";
import Layout from "../components/layout/Layout";
import ReusableForm from "../components/form/ResusableForm";

const ReceptionDoctorPage = () => {
  const { data, createItem, updateItem, deleteItem } = useCrud(ReceptionDoctorApi);
  const [editing, setEditing] = useState(null);

  const [departments, setDepartments]=useState([]);

  useEffect(()=>{
    DepartmentApi.getAll().then(res => setDepartments(res.data))
  },[])

  const departmentOptions = departments.map(d => ({
    value: d.id,
    label: d.name
  }));


// Handle Create and Update
  const handleSubmit = (formData) => {
    const payload = {
      fullName: formData.fullName,
      departmentId: formData.departmentId,
      fee: Number(formData.fee), // ✅ DateOnly
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };


// Every Field for the Create and Update
  const ReceptionDoctorFields = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    {
      name: "departmentId",
      label: "Departments",
      type: "select",
      options: departmentOptions,
      required: true,
    },
    { name: "fee", label: "Fee", type: "number" },
  ];


  // Every Field for Select
  const ReceptionDoctorColumns = [
    { key: "id", label: "ID" },
    { key: "fullName", label: "Full Name" },
    { key: "departmentId", label: "Department" },
    { key: "fee", label: "Fee" },
  ];


  return (
    <Layout>
      <ReusableForm
        fields={ReceptionDoctorFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update ReceptionDoctor" : "Register ReceptionDoctor"}
      />
      <DataTable
        columns={ReceptionDoctorColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
    </Layout>
  );
};

export default ReceptionDoctorPage;
