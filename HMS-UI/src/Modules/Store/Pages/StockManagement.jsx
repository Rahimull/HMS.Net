import { useEffect, useState } from "react";
import ItemApi from "@/api/store/ItemApi";
import ItemStockApi from "@/api/store/ItemStockApi";
import Button from "@/components/common/Button";

const StockManagement = () => {
  const [items, setItems] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [selected, setSelected] = useState(null);

  /* ================= MODALS ================= */
  const [addOpen, setAddOpen] = useState(false);
  const [actionModal, setActionModal] = useState(null);

  /*
    actionModal:
    { type: "receive" | "adjust", itemId: number }
  */

  const [form, setForm] = useState({
    itemId: "",
    quantity: 0,
    location: "",
    batchNumber: "",
    expiryDate: "",
  });

  const [actionForm, setActionForm] = useState({
    quantity: 0,
    reason: "",
  });

  /* ================= LOAD ================= */
  const load = async () => {
    const itemsRes = await ItemApi.getPaged({ page: 1, pageSize: 1000 });
    const stockRes = await ItemStockApi.getPaged({ page: 1, pageSize: 1000 });

    setItems(itemsRes.data.data.data);
    setStocks(stockRes.data.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= STOCK LOGIC ================= */
  const getStock = (id) => stocks.filter((s) => s.itemId === id);

  const total = (id) =>
    getStock(id).reduce((a, b) => a + b.quantity, 0);

  const status = (id) => {
    const t = total(id);
    if (t === 0) return "⚫";
    if (t < 10) return "🔴";
    if (t < 25) return "🟠";
    return "🟢";
  };

  /* ================= ADD STOCK ================= */
  const saveStock = async () => {
    await ItemStockApi.create(form);
    await load();

    setForm({
      itemId: "",
      quantity: 0,
      location: "",
      batchNumber: "",
      expiryDate: "",
    });

    setAddOpen(false);
  };

  /* ================= ACTION (RECEIVE / ADJUST) ================= */
  const applyAction = async () => {
    if (!actionModal) return;

    if (actionModal.type === "receive") {
      await ItemStockApi.create({
        itemId: actionModal.itemId,
        quantity: actionForm.quantity,
        location: "warehouse",
        batchNumber: "AUTO",
        expiryDate: new Date().toISOString().split("T")[0],
      });
    }

    if (actionModal.type === "adjust") {
      await ItemStockApi.adjust({
        itemId: actionModal.itemId,
        quantity: actionForm.quantity,
        reason: actionForm.reason,
      });
    }

    await load();
    setActionModal(null);
    setActionForm({ quantity: 0, reason: "" });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📦 Inventory Control Center
        </h1>

        <Button onClick={() => setAddOpen(true)}>
          + Add Stock
        </Button>
      </div>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        {[
          { label: "Healthy", value: 1200, dot: "bg-green-500" },
          { label: "Low Stock", value: 12, dot: "bg-red-500" },
          { label: "Expiring", value: 8, dot: "bg-yellow-500" },
          { label: "Out", value: 3, dot: "bg-gray-500" },
        ].map((k, i) => (
          <div
            key={i}
            className="relative backdrop-blur-xl bg-white/70 shadow-lg p-5 rounded-2xl border hover:scale-105 transition"
          >
            <div className={`w-2 h-2 rounded-full ${k.dot} absolute top-3 right-3`} />

            <p className="text-sm text-gray-500">{k.label}</p>

            <p className="text-3xl font-bold text-gray-800 mt-1">
              {k.value}
            </p>

            <div className="mt-3 h-1 bg-gray-200 rounded-full">
              <div className={`h-full ${k.dot}`} style={{ width: "70%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* ================= ITEMS GRID ================= */}
      <div className="grid grid-cols-4 gap-5">

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:scale-105 transition cursor-pointer border"
            onClick={() => setSelected(item)}
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-gray-700">{item.name}</h2>
              <span className="text-xl">{status(item.id)}</span>
            </div>

            <p className="text-sm text-gray-400">{item.category}</p>

            <p className="text-lg font-bold mt-2">
              {total(item.id)} units
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">

              <Button
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setActionModal({ type: "receive", itemId: item.id });
                }}
              >
                Receive
              </Button>

              <Button
                className="text-xs bg-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setActionModal({ type: "adjust", itemId: item.id });
                }}
              >
                Adjust
              </Button>

            </div>
          </div>
        ))}

      </div>

      {/* ================= ADD STOCK MODAL ================= */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

          <div className="w-[420px] bg-white h-full p-5 shadow-2xl">

            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">➕ Add Stock</h2>
              <button onClick={() => setAddOpen(false)}>✖</button>
            </div>

            <div className="space-y-3">

              <select
                className="w-full border p-2 rounded"
                value={form.itemId}
                onChange={(e) =>
                  setForm({ ...form, itemId: e.target.value })
                }
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: +e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Batch Number"
                value={form.batchNumber}
                onChange={(e) =>
                  setForm({ ...form, batchNumber: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={form.expiryDate}
                onChange={(e) =>
                  setForm({ ...form, expiryDate: e.target.value })
                }
              />

            </div>

            <button
              onClick={saveStock}
              className="w-full bg-green-600 text-white py-2 mt-6 rounded"
            >
              Save Stock
            </button>

          </div>
        </div>
      )}

      {/* ================= RECEIVE / ADJUST MODAL ================= */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[400px] p-5 rounded-2xl shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              {actionModal.type === "receive"
                ? "📥 Receive Stock"
                : "⚙ Adjust Stock"}
            </h2>

            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Quantity"
              value={actionForm.quantity}
              onChange={(e) =>
                setActionForm({ ...actionForm, quantity: +e.target.value })
              }
            />

            {actionModal.type === "adjust" && (
              <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Reason"
                value={actionForm.reason}
                onChange={(e) =>
                  setActionForm({ ...actionForm, reason: e.target.value })
                }
              />
            )}

            <button
              onClick={applyAction}
              className={`w-full text-white py-2 rounded ${
                actionModal.type === "receive"
                  ? "bg-green-600"
                  : "bg-yellow-600"
              }`}
            >
              Submit
            </button>

            <button
              onClick={() => setActionModal(null)}
              className="w-full bg-gray-500 text-white py-2 mt-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ================= DETAIL PANEL ================= */}
      {selected && (
        <div className="fixed right-0 top-0 w-[480px] h-full bg-white shadow-2xl p-5">

          <h2 className="text-xl font-bold">
            📦 {selected.name}
          </h2>

          <div className="mt-4 text-lg font-bold">
            Total: {total(selected.id)}
          </div>

          <h3 className="mt-5 font-bold">🧪 Batches</h3>

          <div className="space-y-2 mt-3">

            {getStock(selected.id).map((s) => (
              <div key={s.id} className="p-3 border rounded-xl bg-gray-50">
                <div className="flex justify-between">
                  <span>{s.batchNumber}</span>
                  <span>{s.quantity < 5 ? "🔴" : "🟢"}</span>
                </div>

                <p>Qty: {s.quantity}</p>
                <p>Expiry: {s.expiryDate}</p>
              </div>
            ))}

          </div>

          <button
            className="w-full bg-gray-500 text-white py-2 mt-6 rounded"
            onClick={() => setSelected(null)}
          >
            Close
          </button>

        </div>
      )}

    </div>
  );
};

export default StockManagement;