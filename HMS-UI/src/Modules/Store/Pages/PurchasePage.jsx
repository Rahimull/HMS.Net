import { useEffect, useState } from "react";
import PurchaseApi from "@/api/store/PurchaseApi";

const PurchasePage = ({ api }) => {
  const [purchases, setPurchases] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    PurchaseApi.getPaged({ page: 1, pageSize: 50 })
      .then(res => setPurchases(res.data.data.data ?? []));
  }, []);

  const details = selected?.details ?? [];

  /* ================= SELECT ================= */
  const handleSelect = (p) => {
    setSelected(p);
    setForm({
      ...p,
      details: p.details ?? []
    });
    setEditMode(false);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!form) return;

    await api.update(form.id, {
      supplierId: form.supplierId,
      purchaseDate: form.purchaseDate,
      notes: form.notes,
      details: form.details.map(d => ({
        itemId: d.itemId,
        quantity: d.quantity,
        unitPrice: d.unitPrice,
        batchNumber: d.batchNumber,
        expiryDate: d.expiryDate
      }))
    });

    setEditMode(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* ================= HEADER ================= */}
      <div className="h-14 flex items-center justify-between px-6 bg-white border-b shadow-sm">
        <h1 className="font-semibold text-gray-800">
          Purchase Workspace
        </h1>

        <div className="text-xs text-gray-500">
          Total Records: {purchases.length}
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* ================= TABLE ================= */}
        <div className="flex-1 p-4 overflow-auto">

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-5 text-xs font-semibold text-gray-600 bg-gray-50 p-3 border-b">
              <div>ID</div>
              <div>Supplier</div>
              <div>Date</div>
              <div>Total</div>
              <div>Status</div>
            </div>

            {/* ROWS */}
            {purchases.map(p => (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                className={`grid grid-cols-5 p-3 text-sm cursor-pointer transition
                hover:bg-blue-50 hover:shadow-sm
                ${selected?.id === p.id ? "bg-blue-100" : ""}`}
              >
                <div className="font-medium">#{p.id}</div>

                <div className="text-gray-700">
                  {p.supplierName}
                </div>

                <div className="text-gray-500 text-xs">
                  {new Date(p.purchaseDate).toLocaleDateString()}
                </div>

                <div className="text-green-600 font-semibold">
                  {p.totalPrice}
                </div>

                <div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    Completed
                  </span>
                </div>
              </div>
            ))}

          </div>
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
                  <div className="text-sm font-semibold">
                    {details.length}
                  </div>
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
                          <span className="text-sm">
                            {d.itemName}
                          </span>

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