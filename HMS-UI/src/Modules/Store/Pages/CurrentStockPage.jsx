import CurrentStockApi from "@/api/store/CurrentStockApi";
import { useEffect, useMemo, useState } from "react";
import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import Chart from "@/components/common/Chart";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import StockStatus from "../component/StockStatus";
import Toast from "@/components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function StockDashboard() {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState(null);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await CurrentStockApi.getPaged({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sorting?.sortBy,
        sortDir: sorting?.sortDir,
      });

      const data = res.data.data.data ?? res.data.data ?? [];
      setStock(Array.isArray(data) ? data : []);
      setTotalCount(res.data.data.totalCount ?? data.length);

    } catch (err) {
      setToast({ message: "Failed to load data", type: "error" });
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadData();
  }, [pagination, sorting]);

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []); // فقط یکبار

  /* ================= ALERT ================= */
  useEffect(() => {
    if (!stock.length) return;

    const hasOut = stock.some(x => x.quantity === 0);
    const hasLow = stock.some(x => x.quantity < (x.minLevel ?? 10) && x.quantity > 0);

    if (hasOut) {
      setToast({ message: "Some items are OUT OF STOCK!", type: "error" });
    } else if (hasLow) {
      setToast({ message: "Some items are LOW in stock!", type: "warning" });
    }
  }, [stock]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return stock.filter(x =>
      x.itemName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [stock, search]);

  /* ================= KPI ================= */
  const lowStock = useMemo(
    () => stock.filter(x => x.quantity < (x.minLevel ?? 10) && x.quantity > 0),
    [stock]
  );

  const outStock = useMemo(
    () => stock.filter(x => x.quantity === 0),
    [stock]
  );

  const goodStock = useMemo(
    () => stock.filter(x => x.quantity >= (x.minLevel ?? 10)),
    [stock]
  );

  /* ================= CHART ================= */
  const chartData = useMemo(() => {
    return stock.map(x => ({
      name: x.itemName,
      quantity: x.quantity,
      min: x.minLevel ?? 10,
    }));
  }, [stock]);


  /* ================= COLUMNS ================= */
  const columns = useMemo(() => [
    { accessorKey: "itemName", header: "Item" },
    { accessorKey: "quantity", header: "Qty" },
    {
      accessorKey: "minLevel",
      header: "Min",
      cell: ({ row }) => row.original.minLevel ?? 10,
    },
    {
      header: "Status",
      cell: ({ row }) => <StockStatus item={row.original} />,
    },
  ], []);

  /* ================= ACTION ================= */
  const navigate = useNavigate();
  const openBatch = (row) => {
    navigate(`/store/stockManagement?itemId=${row.itemId}&itemName=${row.itemName}`);
  };

  

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Current Stock</h1>
        <p className="text-gray-500">Modular ERP Inventory System</p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-5 gap-4">
        <KPI title="Total" value={stock.length} color="from-blue-500 to-blue-700" />
        <KPI title="Low" value={lowStock.length} color="from-yellow-500 to-yellow-700" />
        <KPI title="Out" value={outStock.length} color="from-red-500 to-red-700" />
        <KPI title="Good" value={goodStock.length} color="from-green-500 to-green-700" />
        <KPI title="Active" value={stock.length - outStock.length} color="from-purple-500 to-purple-700" />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CHART */}
      <Chart data={chartData.slice(0, 10)} />

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filtered}
        pagination={pagination}
        totalCount={totalCount}
        loading={false}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Current Stock"
        actions={(row) => (
          <Button size="sm" onClick={() => openBatch(row)}>
            Batch
          </Button>
        )}
      />

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