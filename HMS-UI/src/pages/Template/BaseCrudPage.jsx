import { useState } from "react";
import Loader from "../../components/common/Loader";
import DataTable from "../../components/common/DataTable";
import ReusableForm from "../../components/form/ResusableForm";
import useCrud from "../../hooks/useCurd";

const BaseCrudPage = ({
  title,
  service,
  fields,
  columns,
  mapFormToPayload,
  mapEntityToForm = (x) => x, // ✅ برای حل مشکل پر نشدن بعضی فیلدها در Edit (اختیاری ولی مفید)
}) => {
  const [editing, setEditing] = useState(null);

  const {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
  } = useCrud(service);

  const handleSubmit = async (formData) => {
    const payload = mapFormToPayload(formData);

    if (editing) {
      await updateItem(editing.id, payload);
      setEditing(null);
    } else {
      await createItem(payload);
    }
  };

  const handlePaginationChange = (updater) => {
    setPagination((prev) => (typeof updater === "function" ? updater(prev) : updater));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>

      {/* Search */}
      <input
        className="border p-2 w-full rounded"
        placeholder={`Search ${title}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <ReusableForm
        fields={fields}
        initialValues={editing ? mapEntityToForm(editing) : null}
        onSubmit={handleSubmit}
        submitText={editing ? "Update" : "Add"}
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* Page size */}
      <div className="flex justify-between items-center">
        <div>
          <label className="mr-2 font-medium">Rows per page:</label>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination({
                pageIndex: 0,
                pageSize: Number(e.target.value),
              })
            }
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <Loader text={`Fetching ${title}...`} />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          totalCount={totalCount}
          onPaginationChange={handlePaginationChange}
          onSortingChange={(sort) => setSorting(sort ?? { sortBy: null, sortDir: "asc" })}
          onEdit={setEditing}
          onDelete={deleteItem}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BaseCrudPage;