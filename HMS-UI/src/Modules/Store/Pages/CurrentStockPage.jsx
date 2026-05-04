import { useEffect, useMemo, useState } from "react";
import CurrentStockApi from "@/api/store/CurrentStockApi";
import Input from "@/components/common/Input";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TOAST ================= */
const Toast = ({ toast }) => {
  if (!toast) return null;

  const color =
    toast.type === "success"
      ? "bg-green-500"
      : toast.type === "warning"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className={`fixed bottom-5 right-5 px-4 py-2 text-white rounded shadow ${color}`}>
      {toast.message}
    </div>
  );
};

/* ================= KPI ================= */
const KPI = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl text-white shadow bg-gradient-to-r ${color}`}>
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

/* ================= MAIN ================= */
const CurrentStockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await CurrentStockApi.getPaged({
        page: 1,
        pageSize: 500,
      });

      const data =
        res?.data?.data?.data ??
        res?.data?.data ??
        res?.data ??
        [];

      setStocks(Array.isArray(data) ? data : []);
    } catch {
      setToast({
        message: "Failed to load stock data",
        type: "error",
      });
    }
  };

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return stocks.filter(x =>
      x.itemName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [stocks, search]);

  /* ================= KPI ================= */
  const lowStock = useMemo(
    () => stocks.filter(x => x.quantity < (x.minLevel ?? 10)),
    [stocks]
  );

  const outStock = useMemo(
    () => stocks.filter(x => x.quantity === 0),
    [stocks]
  );

  /* ================= CHART ================= */
  const chartData = useMemo(() => filtered.slice(0, 20), [filtered]);

  /* ================= ACTION ================= */
  const openBatch = (item) => {
    window.location.href = `/item-stock?itemId=${item.itemId}`;
  };

  const getStatus = (item) => {
    if (item.quantity === 0) return "OUT";
    if (item.quantity < (item.minLevel ?? 10)) return "LOW";
    return "GOOD";
  };

  const getStatusColor = (status) => {
    if (status === "OUT") return "text-red-600";
    if (status === "LOW") return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Current Stock Dashboard</h1>
        <p className="text-gray-500">Inventory overview (read-only)</p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-4">
        <KPI title="Items" value={stocks.length} color="from-blue-500 to-blue-600" />
        <KPI title="Low Stock" value={lowStock.length} color="from-yellow-500 to-yellow-600" />
        <KPI title="Out of Stock" value={outStock.length} color="from-red-500 to-red-600" />
        <KPI title="Active Items" value={stocks.length - outStock.length} color="from-purple-500 to-purple-600" />
      </div>

      {/* ALERT */}
      {outStock.length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          ⚠ {outStock.length} items are out of stock
        </div>
      )}

      {/* SEARCH */}
      <Input
        placeholder="Search inventory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis dataKey="itemName" hide />
            <Tooltip />
            <Bar dataKey="quantity" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Min Level</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(item => {
              const status = getStatus(item);

              return (
                <tr key={item.itemId} className="border-t hover:bg-gray-50">

                  <td className="p-3 font-medium">
                    {item.itemName}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">
                    {item.minLevel ?? 10}
                  </td>

                  <td className={`p-3 font-bold ${getStatusColor(status)}`}>
                    {status}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => openBatch(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Batch
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* TOAST */}
      <Toast toast={toast} />

    </div>
  );
};

export default CurrentStockPage;