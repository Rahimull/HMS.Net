




import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import DataTable from "../components/common/DataTable";
import ReusableForm from "../components/form/ResusableForm";
import PatientApi from "../api/PatientApi";

const PatientPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ Fetch Patients (GET + QueryString)
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await PatientApi.getPaged(pagination);

      // ✅ unwrap ApiResponse<PagedResult<T>>
      const result = res.data.data;

      setData(result.data);
      setTotalCount(result.totalCount);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        "Failed to load Patients"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [pagination]);

  // ✅ Submit (Create / Update)
  const handleSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      description: formData.description,
    };

    try {
      if (editing) {
        await PatientApi.update(editing.id, payload);
        setEditing(null);
      } else {
        await PatientApi.create(payload);
      }
      fetchPatients();
    } catch {
      setError("Operation failed");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await PatientApi.delete(id);
    fetchPatients();
  };

  /* ---------- FORM ---------- */
  const PatientFields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "gender", label: "Gender", type: "select", required: true,
      options:[
        
      ]
     },
    { name: "dob", label: "Date Of Birth", type: "date" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "nationalId", label: "National Id", type: "text" },
  ];

  /* ---------- TABLE COLUMNS ---------- */
  const PatientColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "dob", header: "DOB" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "nationalId", header: "National Id" },
  ];

  return (
    <Layout>
      <ReusableForm
        fields={PatientFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Patient" : "Add Patient"}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {loading ? (
        <Loader text="Fetching Patients..." />
      ) : (
        <DataTable
          columns={PatientColumns}
          data={data}
          pagination={pagination}
          totalCount={totalCount}
          onPaginationChange={setPagination}
          onEdit={setEditing}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </Layout>
  );
};

export default PatientPage;
