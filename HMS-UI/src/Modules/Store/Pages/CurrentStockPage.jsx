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

/* ================= KPI CARD ================= */
const KPI = ({ title, value, sub, color }) => (
  <div className={`p-5 rounded-xl text-white shadow bg-gradient-to-r ${color}`}>
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
    {sub && <p className="text-xs opacity-70">{sub}</p>}
  </div>
);

/* ================= SMART STOCK CARD ================= */
const SmartCard = ({ item, onAction }) => {
  const status =
    item.quantity === 0
      ? "OUT"
      : item.quantity < 10
      ? "LOW"
      : "GOOD";

  const style =
    status === "OUT"
      ? "border-red-500"
      : status === "LOW"
      ? "border-yellow-500"
      : "border-green-500";

  return (
    <div className={`bg-white p-4 rounded-xl shadow border-l-4 ${style}`}>

      <div className="flex justify-between items-center">
        <h3 className="font-bold">{item.itemName}</h3>

        <span className="text-xs px-2 py-1 rounded bg-gray-100">
          {status}
        </span>
      </div>

      <p className="text-2xl font-bold mt-2">{item.quantity}</p>

      {/* MINI INTELLIGENCE */}
      {status === "LOW" && (
        <p className="text-xs text-red-500 mt-1">
          ⚠ Recommended restock: +50 units
        </p>
      )}

      {status === "OUT" && (
        <p className="text-xs text-red-600 mt-1">
          ❌ Stock empty - urgent action required
        </p>
      )}

      <button
        onClick={() => onAction(item)}
        className="mt-3 w-full bg-blue-500 text-white py-1 rounded"
      >
        Quick Action
      </button>

    </div>
  );
};

/* ================= MAIN ================= */
const UltraStockPage = () => {

  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(0);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await CurrentStockApi.getPaged({
      page: 1,
      pageSize: 1000,
    });

    setStocks(res?.data?.data?.data || []);
  };

  /* ================= INTELLIGENCE ENGINE ================= */
  const lowStock = stocks.filter(x => x.quantity < 10);
  const outStock = stocks.filter(x => x.quantity === 0);

  const predictedRestock = useMemo(() => {
    return lowStock.map(x => ({
      ...x,
      recommended: Math.max(50 - x.quantity, 10),
    }));
  }, [lowStock]);

  /* ================= ACTION ================= */
  const openAction = (item) => {
    setSelected(item);
    setQty(item.quantity < 10 ? 50 : 10);
  };

  const confirm = async () => {
    try {
      await CurrentStockApi.restock({
        itemId: selected.itemId,
        quantity: qty,
      });

      setToast({
        message: "Stock updated successfully",
        type: "success",
      });

      setSelected(null);
      load();
    } catch {
      setToast({
        message: "Operation failed",
        type: "error",
      });
    }

    setTimeout(() => setToast(null), 2500);
  };

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return stocks.filter(x =>
      x.itemName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [stocks, search]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Intelligent Stock System</h1>
        <p className="text-gray-500">AI-assisted inventory control</p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-4">

        <KPI title="Items" value={stocks.length} color="from-blue-500 to-blue-600" />
        <KPI title="Low Stock" value={lowStock.length} color="from-yellow-500 to-yellow-600" />
        <KPI title="Out of Stock" value={outStock.length} color="from-red-500 to-red-600" />
        <KPI title="Risk Items" value={predictedRestock.length} color="from-purple-500 to-purple-600" />

      </div>

      {/* ALERT ENGINE */}
      {outStock.length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          ⚠ Critical: {outStock.length} items are out of stock
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
          <BarChart data={filtered}>
            <XAxis dataKey="itemName" hide />
            <Tooltip />
            <Bar dataKey="quantity" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SMART GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(item => (
          <SmartCard
            key={item.itemId}
            item={item}
            onAction={openAction}
          />
        ))}
      </div>

      {/* ACTION PANEL (MODAL++) */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">

          <div className="w-[400px] bg-white p-6 h-full shadow-xl">

            <h2 className="text-lg font-bold">
              Smart Action Panel
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              {selected.itemName}
            </p>

            <div className="mt-4">
              <label className="text-sm">Quantity</label>

              <input
                type="number"
                className="border w-full p-2 rounded mt-1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>

            <button
              onClick={confirm}
              className="w-full mt-4 bg-green-500 text-white py-2 rounded"
            >
              Execute Action
            </button>

            <button
              onClick={() => setSelected(null)}
              className="w-full mt-2 bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* TOAST */}
      <Toast toast={toast} />

    </div>
  );
};

export default UltraStockPage;