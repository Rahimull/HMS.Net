// import { useState } from "react";
// import Loader from "../components/common/Loader";
// import DepartemnApi from "../api/DepartmentApi";
// import useCrud from "../hooks/useCurd";
// import DataTable from "../components/common/DataTable";
// import Layout from "../components/layout/Layout";
// import ReusableForm from "../components/form/ResusableForm";

// const DepartmentPage = () => {
//   const { data, loading, error, createItem, updateItem, deleteItem } =
//     useCrud(DepartemnApi);

//   const [editing, setEditing] = useState(null);

//   // Submit (Create / Update)
//   const handleSubmit = (formData) => {
//     const payload = {
//       name: formData.name,
//       description: formData.description,
//     };

//     if (editing) {
//       updateItem(editing.id, payload);
//       setEditing(null);
//     } else {
//       createItem(payload);
//     }
//   };

//   // Form Fields
//   const departmentFields = [
//     { name: "name", label: "Department Name", type: "text", required: true },
//     { name: "description", label: "Description", type: "textarea" },
//   ];

//   // Table Columns
//   const departmentColumns = [
//     { key: "id", label: "ID" },
//     { key: "name", label: "Department Name" },
//     { key: "description", label: "Description" },
//   ];

//   return (
//     <Layout>
//       {/* Form */}
//       <ReusableForm
//         fields={departmentFields}
//         initialValues={editing}
//         onSubmit={handleSubmit}
//         submitText={editing ? "Update Department" : "Add Department"}
//       />

//       {/* Error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Loader or Table */}
//       {loading ? (
//         <Loader text="Fetching Departments..." />
//       ) : (
//         <DataTable
//           columns={departmentColumns}
//           data={data}
//           onEdit={setEditing}
//           onDelete={deleteItem}
//         />
//       )}
//     </Layout>
//   );
// };

// export default DepartmentPage;


import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import DataTable from "../components/common/DataTable";
import ReusableForm from "../components/form/ResusableForm";
import DepartmentApi from "../api/DepartmentApi";

const DepartmentPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ Fetch departments (GET + QueryString)
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await DepartmentApi.getPaged(pagination);

      // ✅ unwrap ApiResponse<PagedResult<T>>
      const result = res.data.data;

      setData(result.data);
      setTotalCount(result.totalCount);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        "Failed to load departments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [pagination]);

  // ✅ Submit (Create / Update)
  const handleSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      description: formData.description,
    };

    try {
      if (editing) {
        await DepartmentApi.update(editing.id, payload);
        setEditing(null);
      } else {
        await DepartmentApi.create(payload);
      }
      fetchDepartments();
    } catch {
      setError("Operation failed");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await DepartmentApi.delete(id);
    fetchDepartments();
  };

  /* ---------- FORM ---------- */
  const departmentFields = [
    { name: "name", label: "Department Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
  ];

  /* ---------- TABLE COLUMNS ---------- */
  const departmentColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Department Name" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <Layout>
      <ReusableForm
        fields={departmentFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Department" : "Add Department"}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {loading ? (
        <Loader text="Fetching Departments..." />
      ) : (
        <DataTable
          columns={departmentColumns}
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

export default DepartmentPage;
