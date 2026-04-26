import { useEffect, useMemo, useRef, useState } from "react";
import usePurchase from "./usePurchases";
import SuplierApi from "@/api/store/SuplierApi";
import ItemApi from "@/api/store/ItemApi";
import Input from "@/components/common/Input";

const emptyLine = () => ({
  id: Date.now() + Math.random(),
  itemId: "",
  qty: 1,
  price: 0,
  batchNumber: "",
  expiryDate: "",
  error: {},
});

const PurchaseUi = ({ editingPurchase, onClearEdit }) => {
  const { createPurchase, updatePurchase } = usePurchase();

  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveTimer = useRef(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    SuplierApi.getPaged({ page: 1, pageSize: 1000 })
      .then(r => setSuppliers(r.data.data.data));

    ItemApi.getPaged({ page: 1, pageSize: 1000 })
      .then(r => setItems(r.data.data.data));
  }, []);

  const supplierOptions = useMemo(
    () => suppliers.map(s => ({ label: s.name, value: s.id })),
    [suppliers]
  );

  const itemOptions = useMemo(
    () =>
      items.map(i => ({
        label: i.name,
        value: i.id,
        price: i.price,
      })),
    [items]
  );

  /* ================= STATE ================= */
  const [header, setHeader] = useState({
    supplierId: "",
    notes: "",
    purchaseDate: "",
  });

  const [lines, setLines] = useState([emptyLine()]);

  /* ================= EDIT ================= */
  useEffect(() => {
    if (!editingPurchase) return;

    setHeader({
      supplierId: editingPurchase.supplierId,
      notes: editingPurchase.notes,
      purchaseDate: editingPurchase.purchaseDate?.split("T")[0],
    });

    setLines(
      editingPurchase.details.map(d => ({
        id: d.id,
        itemId: d.itemId,
        qty: d.quantity,
        price: d.unitPrice,
        batchNumber: d.batchNumber || "",
        expiryDate: d.expiryDate ? d.expiryDate.split("T")[0] : "",
        error: {},
      }))
    );
  }, [editingPurchase]);

  /* ================= SMART UPDATE ================= */
  const updateLine = (id, field, value) => {
    setLines(prev =>
      prev.map(l => {
        if (l.id !== id) return l;

        let updated = { ...l, [field]: value };

        if (field === "itemId") {
          const item = itemOptions.find(i => i.value == value);
          if (item) updated.price = item.price;
        }

        // inline validation
        updated.error = {
          ...updated.error,
          [field]: !value ? "Required" : "",
        };

        return updated;
      })
    );
  };

  const addLine = () =>
    setLines(p => [...p, emptyLine()]);

  const removeLine = (id) =>
    setLines(p => p.filter(l => l.id !== id));

  /* ================= TOTAL ================= */
  const total = useMemo(
    () =>
      lines.reduce(
        (s, l) => s + (l.qty || 0) * (l.price || 0),
        0
      ),
    [lines]
  );

  /* ================= AUTO SAVE DRAFT ================= */
  useEffect(() => {
    clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      localStorage.setItem(
        "purchase-draft",
        JSON.stringify({ header, lines })
      );
    }, 3000);

    return () => clearTimeout(saveTimer.current);
  }, [header, lines]);

  /* ================= KEY NAVIGATION ================= */
  const handleKey = (e, id, field) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const order = ["itemId", "qty", "price", "batchNumber", "expiryDate"];
      const next = order[order.indexOf(field) + 1];

      if (!next) return addLine();

      document
        .querySelector(`[data-${next}-${id}] input`)
        ?.focus();
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    setLoading(true);

    try {
      const payload = {
        supplierId: Number(header.supplierId),
        purchaseDate: header.purchaseDate,
        notes: header.notes,

        details: lines
          .filter(l => l.itemId)
          .map(l => ({
            itemId: Number(l.itemId),
            quantity: Number(l.qty),
            unitPrice: Number(l.price),
            batchNumber: l.batchNumber || null,
            expiryDate: l.expiryDate || null,
          })),
      };

      if (editingPurchase)
        await updatePurchase(editingPurchase.id, payload);
      else
        await createPurchase(payload);

      localStorage.removeItem("purchase-draft");

      setLines([emptyLine()]);
      setHeader({ supplierId: "", notes: "", purchaseDate: "" });

      onClearEdit?.();

    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex gap-4 p-6 bg-gray-100 min-h-screen">

      {/* LEFT PANEL (ODOO STYLE) */}
      <div className="w-1/4 bg-white p-4 rounded-xl shadow sticky top-4">

        <h2 className="text-lg font-bold mb-4">Purchase Order</h2>

        <Input
          type="select"
          value={header.supplierId}
          options={supplierOptions}
          label="Vendor"
          onChange={(e) =>
            setHeader({ ...header, supplierId: e.target.value })
          }
        />

        <Input
          type="date"
          value={header.purchaseDate}
          label="Date"
          onChange={(e) =>
            setHeader({ ...header, purchaseDate: e.target.value })
          }
        />

        <Input
          label="Notes"
          value={header.notes}
          onChange={(e) =>
            setHeader({ ...header, notes: e.target.value })
          }
        />

        {/* SUMMARY */}
        <div className="mt-6 p-3 bg-green-100 rounded">
          <div className="text-sm">Total</div>
          <div className="text-2xl font-bold text-green-700">
            {total.toFixed(2)}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Confirm Order"}
        </button>

      </div>

      {/* RIGHT GRID */}
      <div className="flex-1 bg-white p-4 rounded-xl shadow">

        {/* HEADER */}
        <div className="grid grid-cols-6 text-sm font-bold border-b pb-2 mb-2">
          <div>Product</div>
          <div>Qty</div>
          <div>Price</div>
          <div>Batch</div>
          <div>Expiry</div>
          <div>Total</div>
        </div>

        {/* LINES */}
        {lines.map(l => (
          <div key={l.id} className="grid grid-cols-6 gap-2 py-2 border-b">

            {/* ITEM */}
            <div data-itemId={l.id}>
              <Input
                type="select"
                value={l.itemId}
                options={itemOptions}
                onChange={(e) =>
                  updateLine(l.id, "itemId", e.target.value)
                }
                onKeyDown={(e) => handleKey(e, l.id, "itemId")}
              />
              {l.error.itemId && (
                <span className="text-red-500 text-xs">
                  {l.error.itemId}
                </span>
              )}
            </div>

            <Input
              type="number"
              value={l.qty}
              onChange={(e) =>
                updateLine(l.id, "qty", Number(e.target.value))
              }
            />

            <Input
              type="number"
              value={l.price}
              onChange={(e) =>
                updateLine(l.id, "price", Number(e.target.value))
              }
            />

            <Input
              value={l.batchNumber}
              onChange={(e) =>
                updateLine(l.id, "batchNumber", e.target.value)
              }
            />

            <Input
              type="date"
              value={l.expiryDate}
              onChange={(e) =>
                updateLine(l.id, "expiryDate", e.target.value)
              }
            />

            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">
                {(l.qty * l.price).toFixed(2)}
              </span>

              <button
                onClick={() => removeLine(l.id)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>

          </div>
        ))}

        {/* ADD LINE */}
        <button
          onClick={addLine}
          className="mt-4 text-blue-600 font-bold"
        >
          + Add a line
        </button>

      </div>

    </div>
  );
};

export default PurchaseUi;