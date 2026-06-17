import { useCallback, useEffect, useMemo, useState } from "react";
import PurchaseApi from "@/api/store/PurchaseApi";
import DataTable from "@/components/common/DataTable";
import { toast } from "react-toastify";

const PurchasePage = ({ api }) => {
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  const [purchaseData, setPurchaseData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const details = selected?.details ?? [];

  /* ================= SELECT ================= */
  const handleSelect = (p) => {
    setSelected(p);
    setForm({
      ...p,
      details: p.details ?? [],
    });
    setEditMode(false);
    console.log(p);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!form) return;

    await api.update(form.id, {
      supplierId: form.supplierId,
      purchaseDate: form.purchaseDate,
      notes: form.notes,
      details: form.details.map((d) => ({
        itemId: d.itemId,
        quantity: d.quantity,
        unitPrice: d.unitPrice,
        batchNumber: d.batchNumber,
        expiryDate: d.expiryDate,
      })),
    });

    setEditMode(false);
  };

  /* ======== NEW PURCHASE LIST ================ */

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PurchaseApi.getPaged({
        pagination: {
          pageIndex: pagination.pageIndex ?? 0,
          pageSize: pagination.pageSize || 10,
        },
        sorting: sorting
          ? {
              sortBy: sorting.id,
              isDescending: sorting.desc,
            }
          : {
              sortBy: "id",
              isDescending: false,
            },

        search: {
          searchTerm: search,
        },
      });

      const Pageddata = res.data.data;
      const data = Pageddata.data ?? [];

      setPurchaseData(Array.isArray(data) ? data : []);
      setTotalCount(Pageddata.totalCount ?? 0);
    } catch (error) {
      toast.error("Failed to load Purchases");
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(delay);
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  console.log("Data: ", purchaseData);

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
      cell: ({ row }) => <span># {row.original.id}</span>,
    },
    { accessorKey: "supplierName", header: "Supplier", enableSorting: true },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.purchaseDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Price",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="text-green-600 font-semibold">
          {row.original.totalPrice} Af
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: () => (
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
          Completed
        </span>
      ),
    },
  ],[]);

  const actions = useMemo(() => [
    {
      label: "View",
      className: "text-blue-500",
      icon: "👁",
      onClick: (row) => handleSelect(row),
    },
  ],[handleSelect]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* ================= HEADER ================= */}

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* ================= TABLE ================= */}
        <div className="flex-1 p-1 overflow-auto">
          {/* TABLE */}
          <DataTable
            columns={columns}
            data={purchaseData}
            pagination={pagination}
            totalCount={totalCount}
            loading={loading}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            tableTitle="Purchase List"
            subTitle="Pharmacy Purchase List"
            actions={actions}
          />
        </div>

        {/* ================= INSPECTOR ================= */}
        <div className="w-[400px] bg-white border-l p-5 overflow-auto">
          {!selected && (
            <div className="text-sm text-gray-400">
              Select a purchase to view details
            </div>
          )}

          {selected && (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-sm font-semibold">
                    Purchase #{selected.id}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {selected.supplierName}
                  </p>
                </div>

                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {editMode ? "View Mode" : "Edit"}
                </button>
              </div>

              {/* KPI CARDS */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-gray-50 border rounded-xl">
                  <div className="text-xs text-gray-500">Items</div>
                  <div className="text-sm font-semibold">{details.length}</div>
                </div>

                <div className="p-3 bg-green-50 border rounded-xl">
                  <div className="text-xs text-gray-500">Total</div>
                  <div className="text-sm font-semibold text-green-600">
                    {selected.totalPrice}
                  </div>
                </div>
              </div>

              {/* ================= EDIT MODE ================= */}
              {editMode ? (
                <div className="space-y-3">
                  <textarea
                    className="w-full border rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={form?.notes || ""}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Notes..."
                  />

                  <div className="text-xs font-semibold text-gray-600">
                    Items
                  </div>

                  {form?.details?.map((d, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded-xl bg-gray-50 space-y-2"
                    >
                      <input
                        className="w-full border rounded p-1 text-xs"
                        value={d.quantity}
                        onChange={(e) => {
                          const newDetails = [...form.details];
                          newDetails[i].quantity = Number(e.target.value);
                          setForm({ ...form, details: newDetails });
                        }}
                        placeholder="Qty"
                      />

                      <input
                        className="w-full border rounded p-1 text-xs"
                        value={d.unitPrice}
                        onChange={(e) => {
                          const newDetails = [...form.details];
                          newDetails[i].unitPrice = Number(e.target.value);
                          setForm({ ...form, details: newDetails });
                        }}
                        placeholder="Price"
                      />
                    </div>
                  ))}

                  <button
                    onClick={handleUpdate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <>
                  {/* VIEW MODE */}

                  <div className="space-y-2 mb-4">
                    {details.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <div className="flex justify-between">
                          <span className="text-sm">{d.itemName}</span>

                          <span className="text-green-600 font-semibold text-sm">
                            {d.quantity}
                          </span>
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          Batch: {d.batchNumber || "-"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* TIMELINE */}
                  <div className="text-xs space-y-1 text-gray-500 border-t pt-3">
                    <p>✔ Created successfully</p>
                    <p>✔ Stock updated</p>
                    <p>✔ Batch generated</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
