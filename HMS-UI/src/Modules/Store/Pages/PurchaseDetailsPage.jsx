import { useEffect, useMemo, useState } from "react";
import StockMovementApi from "@/api/store/StockMovementApi";

import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import Toast from "@/components/common/Toast";

export default function StockMovementPage() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [toast, setToast] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState(null);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await StockMovementApi.getPaged({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sorting?.sortBy,
        sortDir: sorting?.sortDir,
        type: typeFilter || undefined,
      });

      const data = res.data.data.data ?? res.data.data ?? [];
      setMovements(Array.isArray(data) ? data : []);
      setTotalCount(res.data.data.totalCount ?? data.length);
    } catch (err) {
      setToast({ message: "Failed to load movements", type: "error" });
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination, sorting, typeFilter]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return movements.filter((x) =>
      x.itemName?.toLowerCase().includes(search.toLowerCase()) ||
      x.batchNumber?.toLowerCase().includes(search.toLowerCase())
    );
  }, [movements, search]);

  /* ================= KPI ================= */
  const totalIn = useMemo(
    () => movements.filter((x) => x.quantity > 0).length,
    [movements]
  );

  const totalOut = useMemo(
    () => movements.filter((x) => x.quantity < 0).length,
    [movements]
  );

  const totalValue = useMemo(() => {
    return movements.reduce(
      (sum, x) => sum + Math.abs(x.quantity * (x.unitPrice ?? 0)),
      0
    );
  }, [movements]);

  /* ================= COLUMNS ================= */
  const columns = useMemo(() => [
    {
      accessorKey: "itemName",
      header: "Item",
    },
    {
      accessorKey: "batchNumber",
      header: "Batch",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => (
        <span className={row.original.quantity > 0 ? "text-green-600" : "text-red-600"}>
          {row.original.quantity > 0 ? "+" : ""}
          {row.original.quantity}
        </span>
      ),
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      cell: ({ row }) =>
        `${row.original.unitPrice?.toLocaleString()} AFG`,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;

        const color =
          type === "Sale"
            ? "bg-red-100 text-red-700"
            : type === "Purchase"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700";

        return (
          <span className={`px-2 py-1 rounded text-xs font-bold ${color}`}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString()
          : "-",
    },
  ], []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold">Stock Movement History</h1>
        <p className="text-gray-500">Audit & Tracking Center</p>
      </div>

      {/* ================= KPI ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <KPI
          title="In Movements"
          value={totalIn}
          color="from-green-500 to-green-700"
        />
        <KPI
          title="Out Movements"
          value={totalOut}
          color="from-red-500 to-red-700"
        />
        <KPI
          title="Total Value"
          value={`${totalValue.toLocaleString()} AFG`}
          color="from-blue-500 to-blue-700"
        />
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-3">
        <Input
          placeholder="Search item or batch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Sale">Sale</option>
          <option value="Purchase">Purchase</option>
          <option value="Adjustment">Adjustment</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <DataTable
        columns={columns}
        data={filtered}
        pagination={pagination}
        totalCount={totalCount}
        loading={false}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Movements"
      />

      {/* ================= TOAST ================= */}
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