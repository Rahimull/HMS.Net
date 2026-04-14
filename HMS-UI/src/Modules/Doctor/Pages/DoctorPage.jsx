import { useState,useEffect } from "react";
import DoctorApi from "../../../api/Doctor/DoctorApi"
import DepartmentApi from "../../../api/DepartmentApi";
import useCrud from "../../../hooks/useCurd";
import DataTable from "../../../components/common/DataTable";
import Layout from "../../../components/layout/Layout";
import ReusableForm from "../../../components/form/ResusableForm";
import Loader from "../../../components/common/Loader";

const DoctorPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(DoctorApi);

  const [editing, setEditing] = useState(null);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    DepartmentApi.getAll().then((res) => {
      setDepartment(res.data.data);
    });
  }, []);
 

 
  const DepartmentOptions = department.map((d) => ({
    value: d.id,
    label: `${d.name}`,
  }));

  // Submit (create / update)
  const handleSubmit = (formData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      specialization: formData.specialization, 
      email: formData.email, 
      isActive: Boolean(formData.isActive),
      fee: Number(formData.fee),
      phoneNumber: formData.phoneNumber,
      departmentId: Number(formData.departmentId),
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };

  // From Fields
  const DoctorFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "Text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "specialization",
      label: "Specialization",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "fee",
      label: "Fee",
      type: "number",
    },
    { name: "isActive", label: "Is Active", type: "checkbox" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "departmentId", label: "Department Name", type: "select", 
        options:DepartmentOptions
    },
    
  ];

  // Table Columns
  const DoctorColumns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "specialization", label: "Specialization" },
    { key: "email", label: "Email" },
    { key: "isActive", label: "Is Active" },
    { key: "fee", label: "Fee" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "departmentName", label: "Department" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={DoctorFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Doctor" : "Register Doctor"}
      />

      {/* Errors */}
      {error && <p style={{color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ?
      (
        <Loader />
      ) :(
        <DataTable
        columns={DoctorColumns}
        data={data}
        onEdit={setEditing}
        onDelete={deleteItem}
      />
      )}
      
    </Layout>
  );
};

export default DoctorPage;
