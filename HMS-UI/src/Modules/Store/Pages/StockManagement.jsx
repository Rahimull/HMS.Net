import { useEffect, useMemo, useState } from "react";

import ItemStockApi from "@/api/store/ItemStockApi";

import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";

export default function ItemStockPage() {
  const [itemStocks, setItemStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [selected, setSelected] = useState(null);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await ItemStockApi.getPaged({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sorting?.sortBy,
        sortDir: sorting?.sortDir,
      });

      const data = res.data.data.data ?? res.data.data ?? [];

      setItemStocks(Array.isArray(data) ? data : []);
      setTotalCount(res.data.data.totalCount ?? data.length);
    } catch (err) {
      setToast({ message: "Failed to load batch inventory", type: "error" });
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination, sorting]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return itemStocks.filter(
      (x) =>
        x.itemName?.toLowerCase().includes(search.toLowerCase()) ||
        x.batchNumber?.toLowerCase().includes(search.toLowerCase())
    );
  }, [itemStocks, search]);

  /* ================= KPI ================= */
  const expiredCount = useMemo(() => {
    const today = new Date();
    return itemStocks.filter(
      (x) => x.expiryDate && new Date(x.expiryDate) < today
    ).length;
  }, [itemStocks]);

  const lowCount = useMemo(() => {
    return itemStocks.filter(
      (x) => x.remainingQuantity < (x.minLevel ?? 10)
    ).length;
  }, [itemStocks]);

  const nearExpiry = useMemo(() => {
    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

    return itemStocks.filter((x) => {
      if (!x.expiryDate) return false;
      const expiry = new Date(x.expiryDate);
      return expiry >= today && expiry <= next30;
    }).length;
  }, [itemStocks]);

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

  const viewMovement = (row) => {
    console.log("Movement:", row);
  };

  const editBatch = (row) => {
    console.log("Edit:", row);
  };

  const adjustStock = (row) => {
    console.log("Adjust:", row);
  };

  /* ================= COLUMNS ================= */
  const columns = useMemo(() => [
    { accessorKey: "itemName", header: "Item" },
    { accessorKey: "batchNumber", header: "Batch No" },
    { accessorKey: "initialQuantity", header: "Initial Qty" },
    { accessorKey: "remainingQuantity", header: "Stock" },
    {
      accessorKey: "buyPrice",
      header: "Buy Price",
      cell: ({ row }) => {
        const value = row.original.buyPrice;

        const style = value > 10000
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700";

        return (
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${style}`}>
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
          <span className={`px-2 py-1 rounded text-xs font-bold ${status.className}`}>
            {status.label}
          </span>
        );
      },
    },
  ], []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">ItemStock Management</h1>
        <p className="text-gray-500">Batch Inventory System</p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-4">
        <KPI title="Total Batches" value={itemStocks.length} color="from-blue-500 to-blue-700" />
        <KPI title="Expired" value={expiredCount} color="from-red-500 to-red-700" />
        <KPI title="Low Stock" value={lowCount} color="from-yellow-500 to-yellow-700" />
        <KPI title="Near Expiry" value={nearExpiry} color="from-orange-500 to-orange-700" />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search item or batch..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filtered}
        pagination={pagination}
        totalCount={totalCount}
        loading={false}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Batch Inventory"
        actions={(row) => (
          <div className="flex gap-2">

            <Button
              size="sm"
              className="bg-blue-500 text-white"
              onClick={() => viewBatch(row)}
            >
              View
            </Button>

            <Button
              size="sm"
              className="bg-purple-500 text-white"
              onClick={() => viewMovement(row)}
            >
              Movement
            </Button>

          </div>
        )}
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
              <p><b>Item:</b> {selected.itemName}</p>
              <p><b>Batch:</b> {selected.batchNumber}</p>
              <p><b>Stock:</b> {selected.remainingQuantity}</p>
              <p><b>Buy Price:</b> {selected.buyPrice} AFG</p>
              <p><b>Expiry:</b> {selected.expiryDate ? new Date(selected.expiryDate).toLocaleDateString() : "-"}</p>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full bg-purple-500 text-white">Movement</Button>
              <Button className="w-full bg-green-500 text-white">Edit</Button>
              <Button className="w-full bg-yellow-500 text-white">Adjust</Button>
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