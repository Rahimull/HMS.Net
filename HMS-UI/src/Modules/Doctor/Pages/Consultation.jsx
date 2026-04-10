import { useState, useEffect } from "react";
import ConsultationApi from "../services/ConsultationApi";
import DepartmentApi from "../../../api/DepartmentApi";
import useCrud from "../../../hooks/useCurd";
import DataTable from "../../../components/common/DataTable";
import Layout from "../../../components/layout/Layout";
import ReusableForm from "../../../components/form/ResusableForm";
import Loader from "../../../components/common/Loader";

const ConsultationPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(ConsultationApi);

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

  // {
  //   "visitDate": "2026-04-10T16:52:46.291Z",
  //   "chiefComplaint": "asdf;alkjsd;la",
  //   "notes": "ajs;dfkasl",
  //   "examination": "ajsdl;fasdk",
  //   "doctorId": 2,
  //   "patientId": 3
  // }

  // From Fields
  const ConsultationFields = [
    {name: "visitDate", label: "Visit Date", type: "datetime", required: true },
    {
      name: "chiefComplain",
      label: "Chief Complaint",
      type: "text",
      required: true,
    },
    {
      name: "patientId",
      label: "Patient",
      type: "select",
      options: []
    },
    {name: "examination", label: "Examination", type: "Text",required: true },
    {
      name: "doctorId",
      label: "Doctor",
      type: "select",
      options: []

    },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  // Table Columns
  const ConsultationColumns = [
    { key: "id", label: "ID" },
    { key: "visitDate", label: "Visit Date" },
    { key: "chiefComplaint", label: "Chief Complaint" },
    { key: "notes", label: "Notes" },
    { key: "examination", label: "Examination" },
    { key: "doctorId", label: "Doctor Name" },
    { key: "patientId", label: "Patient Name" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={ConsultationFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Consultation" : "Register Consultation"}
      />

      {/* Errors */}
      {error && <p style={{ color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={ConsultationColumns}
          data={data}
          onEdit={setEditing}
          onDelete={deleteItem}
        />
      )}
    </Layout>
  );
};

export default ConsultationPage;
