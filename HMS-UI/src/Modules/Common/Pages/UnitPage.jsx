import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import UnitApi from "../../../api/Common/UnitApi";
import Modal from "@/components/modal/Modal";
import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import TestForm from "@/components/form/testForm";
import useLoadData from "@/hooks/useLoadData";
import DataTable from "@/components/common/DataTable";

const UnitPage = () => {
  const [openModal, setOmpenModal] = useState(false);
  const [editing, setEditing] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // for load data
  const [filterStatus, setFilterStatus] = useState("all");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filters = useMemo(
    () => ({
      status: filterStatus,
      fromDate,
      toDate,
    }),
    [filterStatus, fromDate, toDate],
  );

  const { createRecord, updateRecord,deleteRecord, loading, error } =
    useCreatUpdateForm(UnitApi);

  const {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    dataLoading,
  } = useLoadData(UnitApi, { filters, refreshKey });

  const handleSubmit = async (formData) => {
    let success = false;
    if (editing) {
      success = await updateRecord(editing.id, formData);
    } else {
      success = await createRecord(formData);
    }
    if (success) {
      setOmpenModal(false);
      setRefreshKey(prev => prev + 1);
      setEditing(null)
    }
  };

  const handleDelete = async (id)=>{
    let success = await deleteRecord(id);
    
    if (success){
      setRefreshKey((prev) => prev + 1);
    }
  }

  const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
  ];

  // ACTIONS
  const actions = useMemo(
    () => [
      {
        label: "Edit",
        className: "text-blue-400",
        icon: "✏️",
        onClick: (row) => {
          setEditing(row);
          setOmpenModal(true);
        },
      },

      {
        label: "Delete",
        icon: "🗑",
        danger: true,
        onClick: (row) => handleDelete(row.id),
      },
    ],
    [setEditing, openModal, handleDelete],
  );

  return (
    <>
      <Button onClick={() => setOmpenModal(true)}>Add Unit</Button>
      {openModal && (
        <Modal
          title={editing ? "Update Unit" : "Add Unit"}
          open={true}
          onClose={() => setOmpenModal(false)}
        >
          <TestForm
            fields={[
              {
                name: "name",
                label: "Name [*,  🔑]",
                placeholder: "Enter Unit",
                type: "text",
                maxLength: 100,
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            submitText={editing ? "Update Unit" : "Add Unit"}
            initialValues={editing}
            loading={loading}
          />
        </Modal>
      )}

      {/* Data Table */}

      <DataTable
        
        columns={columns}
        data={data}
        title="Unit List"
        subTitle="Pharmacy Unit List"
        pagination={pagination}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={dataLoading}
        headerContent=""
        actions={actions}
        totalCount={totalCount}
      />

     
    </>
  );
};

export default UnitPage;
