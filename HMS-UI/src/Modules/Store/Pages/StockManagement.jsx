import { useEffect, useMemo, useState } from "react";

import ItemStockApi from "@/api/store/ItemStockApi";

import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ItemStockPage() {
  const [itemStocks, setItemStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [searchParams] = useSearchParams();
  const [kpi, setKpi] = useState({
    totalBatches: 0,
    expiredBatches: 0,
    lowStockBatches: 0,
    nearExpiryBatches: 0,
  });

  /* ================= LOAD KPI ================= */
  const loadKpi = async () => {
    try {
      const res = await ItemStockApi.getKpi();
      setKpi(res.data);
    } catch (err) {
      setToast({ message: "Failed to load KPI data", type: "error" });
    }
  };

  useEffect(() => {
    loadKpi();
  }, []);

  /* ================= INITIAL LOAD ================= */
  // const itemId = searchParams.get("itemId");

  
  const itemName = searchParams.get("itemName");
  useEffect(() => {
    if (itemName && search === "") {
      setSearch(itemName);
    }
  }, [itemName]);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ItemStockApi.getPaged({
        pagination: {
          pageIndex: pagination.pageIndex ?? 0,
          pageSize: pagination.pageSize || 10,
        },

        sortBy: sorting
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

      const PagedData = res.data.data;
      const data = PagedData.data ?? [];

      setItemStocks(Array.isArray(data) ? data : []);
      setTotalCount(PagedData.totalCount ?? 0);
    } catch (err) {
      setToast({ message: "Failed to load batch inventory", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(delay);
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  /* ================= STATUS ================= */
  const getStatus = (row) => {
    const today = new Date();
    const expiry = row.expiryDate ? new Date(row.expiryDate) : null;

    if (row.remainingQuantity === 0) {
      return { label: "OUT", className: "bg-red-100 text-red-700" };
    }

    if (expiry && expiry < today) {
      return { label: "EXPIRED", className: "bg-red-200 text-red-800" };
    }

    if (row.remainingQuantity < (row.minLevel ?? 10)) {
      return { label: "LOW", className: "bg-yellow-100 text-yellow-700" };
    }

    return { label: "GOOD", className: "bg-green-100 text-green-700" };
  };

  /* ================= ACTIONS ================= */
  const viewBatch = (row) => setSelected(row);

   /* ================= ACTIONS ================= */
   const navigate = useNavigate();



  const viewMovement = (row) => {
    navigate(`/store/stockMovement?itemId=${row.itemId}&batchNumber=${row.batchNumber}`);
  };

  const editBatch = (row) => {
    console.log("Edit:", row);
  };

  const adjustStock = (row) => {
    console.log("Adjust:", row);
  };

  /* ================= COLUMNS ================= */
  const columns = useMemo(
    () => [
      { accessorKey: "itemName", header: "Item" },
      { accessorKey: "batchNumber", header: "Batch No" },
      { accessorKey: "initialQuantity", header: "Initial Qty" },
      { accessorKey: "remainingQuantity", header: "Stock" },
      {
        accessorKey: "buyPrice",
        header: "Buy Price",
        cell: ({ row }) => {
          const value = row.original.buyPrice;

          const style =
            value > 10000
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700";

          return (
            <span
              className={`px-2 py-1 rounded-md text-xs font-semibold ${style}`}
            >
              💰 {value?.toLocaleString()} AFG
            </span>
          );
        },
      },
      {
        accessorKey: "expiryDate",
        header: "Expiry",
        cell: ({ row }) =>
          row.original.expiryDate
            ? new Date(row.original.expiryDate).toLocaleDateString()
            : "-",
      },
      {
        header: "Status",
        cell: ({ row }) => {
          const status = getStatus(row.original);
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${status.className}`}
            >
              {status.label}
            </span>
          );
        },
      },
    ],
    [],
  );

    // ACTIONS
  const actions = useMemo(()=> [
    {
      label: "View",
      className: "text-blue-500",
      icon: "👁",
      onClick: (row) => viewBatch(row),
    },
    {
      label: "Movement",
      className: "text-purple-500",
      icon: "✏️",
      onClick: (row) => viewMovement(row),
    },
    ],);

  // (row) => (
  //         <div className="flex gap-2">
  //           <Button
  //             size="sm"
  //             className="bg-blue-500 text-white"
  //             onClick={() => viewBatch(row)}
  //           >
  //             View
  //           </Button>

  //           <Button
  //             size="sm"
  //             className="bg-purple-500 text-white"
  //             onClick={() => viewMovement(row)}
  //           >
  //             Movement
  //           </Button>
  //         </div>
  //       )

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {itemName ? `${itemName} Batches` : "Batch Dashboard"}
        </h1>
        <p className="text-gray-500">
          {itemName
            ? `Showing all batches for ${itemName} `
            : "Batch Inventory"}
        </p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-5 gap-4">
        <KPI
          title="Total Batches"
          value={kpi.totalBatches}
          color="from-blue-500 to-blue-700"
        />
        <KPI
          title="Expired"
          value={kpi.expiredBatches}
          color="from-red-500 to-red-700"
        />
        <KPI
          title="Low Stock"
          value={kpi.lowStockBatches}
          color="from-yellow-500 to-yellow-700"
        />
        <KPI
          title="Near Expiry"
          value={kpi.nearExpiryBatches}
          color="from-orange-500 to-orange-700"
        />
        <KPI
          title="Expiry Rate"
          value={`${Number(kpi.expiryRate ?? 0).toFixed(2)}%`}
          color="from-gray-500 to-gray-700"
        />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search item or batch..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on search
        }}
      />

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={itemStocks}
        pagination={pagination}
        totalCount={totalCount}
        loading={loading}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Batch Inventory"
        actions={actions}
      />

      {/* DRAWER */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-end">
          <div className="w-[420px] bg-white h-full p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Batch Details</h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <b>Item:</b> {selected.itemName}
              </p>
              <p>
                <b>Batch:</b> {selected.batchNumber}
              </p>
              <p>
                <b>Stock:</b> {selected.remainingQuantity}
              </p>
              <p>
                <b>Buy Price:</b> {selected.buyPrice} AFG
              </p>
              <p>
                <b>Expiry:</b>{" "}
                {selected.expiryDate
                  ? new Date(selected.expiryDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full bg-purple-500 text-white">
                Movement
              </Button>
              <Button className="w-full bg-green-500 text-white">Edit</Button>
              <Button className="w-full bg-yellow-500 text-white">
                Adjust
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
