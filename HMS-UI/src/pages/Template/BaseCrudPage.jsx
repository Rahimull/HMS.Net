import { useState } from "react";
import Loader from "../../components/common/Loader";
import DataTable from "../../components/common/DataTable";
import ReusableForm from "../../components/form/ResusableForm";
import useCrud from "../../hooks/useCurd";
import { Pencil, Trash2 } from "lucide-react";

const BaseCrudPage = ({
  title,
  tableTitle,
  service,
  fields,
  columns,
  mapFormToPayload,
  actions = [],
  mapEntityToForm = (x) => x,
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

  //  FIX: normalize entity for EDIT (important for enums/selects)
  const normalizeEntity = (entity) => {
    if (!entity) return null;

    const result = mapEntityToForm(entity);

    const normalized = { ...result };

    fields.forEach((f) => {
      if (f.type === "select") {
        normalized[f.name] = Number(normalized[f.name]);
      }
    });
    if (normalized.type !== undefined) {
      normalized.type = Number(normalized.type);
    }

    return normalized;
  };

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
    setPagination((prev) =>
      typeof updater === "function" ? updater(prev) : updater,
    );
  };

  // Default actions
  const defaultActions = [
    {
      label: "Edit",
      className:"text-blue-600",
      icon: <Pencil size={14} />,
      onClick: (row) => setEditing(row),
    },
    {
      label: "Delete",
      icon: <Trash2 size={14} />,
      danger: true,
      onClick: (row) => deleteItem(row.id),
    },
  ];

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
        initialValues={editing ? normalizeEntity(editing) : null}
        onSubmit={handleSubmit}
        submitText={editing ? "Update" : "Add"}
      />

      {error && <p className="text-red-500">{error}</p>}


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
          onSortingChange={(sort) =>
            setSorting(sort ?? { sortBy: null, sortDir: "asc" })
          }
          actions={actions.length ? actions : defaultActions}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BaseCrudPage;
