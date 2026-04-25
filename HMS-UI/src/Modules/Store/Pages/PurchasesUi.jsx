import { useEffect, useState } from "react";
import usePurchase from "./usePurchases";
import SuplierApi from "@/api/store/SuplierApi";
import ItemApi from "@/api/store/ItemApi";
import Input from "@/components/common/Input";

const PurchaseUi = ({ editingPurchase, onClearEdit }) => {
  const { createPurchase, updatePurchase } = usePurchase();

  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);


  

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    SuplierApi.getPaged({ page: 1, pageSize: 1000 })
      .then((res) => setSuppliers(res.data.data.data));

    ItemApi.getPaged({ page: 1, pageSize: 1000 })
      .then((res) => setItems(res.data.data.data));
  }, []);

  /* ================= OPTIONS ================= */

  const supplierOptions = suppliers.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const itemOptions = items.map((i) => ({
    label: i.name,
    value: i.id,
    price: i.price,
  }));

  /* ================= HEADER ================= */

  const [header, setHeader] = useState({
    supplierId: "",
    notes: "",
    purchaseDate: "",
  });

  /* ================= ROWS ================= */

  const [rows, setRows] = useState([]);

  /* ================= LOAD EDIT DATA ================= */

  useEffect(() => {
    if (!editingPurchase) return;

    setHeader({
      supplierId: editingPurchase.supplierId,
      notes: editingPurchase.notes,
      purchaseDate: editingPurchase.purchaseDate?.split("T")[0],
    });

    setRows(
      editingPurchase.details.map((d) => ({
        id: d.id || Date.now() + Math.random(),
        itemId: d.itemId,
        qty: d.quantity,
        price: d.unitPrice,
      }))
    );
  }, [editingPurchase]);

  /* ================= ROW ACTIONS ================= */

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), itemId: "", qty: 1, price: 0 },
    ]);
  };

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;

        let updated = { ...r, [field]: value };

        if (field === "itemId") {
          const item = itemOptions.find((i) => i.value == value);
          if (item) updated.price = item.price;
        }

        return updated;
      })
    );
  };

  const removeRow = (id) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  /* ================= TOTAL ================= */

  const grandTotal = rows.reduce(
    (sum, r) => sum + r.qty * r.price,
    0
  );

  /* ================= SAVE (CREATE + UPDATE) ================= */

  const handleSave = async () => {
    setLoading(true);

    try {
      const payload = {
        supplierId: Number(header.supplierId),
        purchaseDate: header.purchaseDate,
        notes: header.notes,
        totalPrice: grandTotal,

        details: rows.map((r) => ({
          itemId: Number(r.itemId),
          quantity: Number(r.qty),
          unitPrice: Number(r.price),
          batchNumber: r.batchNumber ?? null,
          expiryDate: r.expiryDate ?? null,
        })),
      };

      if (editingPurchase) {
        await updatePurchase(editingPurchase.id, payload);
      } else {
        await createPurchase(payload);
      }
      console.log("PURCHASE PAYLOAD:", payload);

      alert("Purchase Saved Successfully ✅");

      setHeader({
        supplierId: "",
        notes: "",
        purchaseDate: "",
      });

      setRows([]);

      onClearEdit?.();
    } finally {
      setLoading(false);
    }
  };


  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        🧾 Purchase Module {editingPurchase ? "(Edit Mode)" : "(Create Mode)"}
      </h1>

      {/* ================= HEADER ================= */}
      <div className="bg-white p-5 rounded shadow grid grid-cols-3 gap-4">

        <Input
          type="select"
          value={header.supplierId}
          options={supplierOptions}
          label="Supplier"
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
      </div>

      {/* ================= DETAILS ================= */}
      <div className="bg-white mt-6 p-5 rounded shadow">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-100">
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>❌</th>
            </tr>
          </thead>

          <tbody>

            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No items
                </td>
              </tr>
            )}

            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">

                {/* ITEM */}
                <td>
                  <Input
                    type="select"
                    value={r.itemId}
                    options={itemOptions}
                    onChange={(e) =>
                      updateRow(r.id, "itemId", e.target.value)
                    }
                  />
                </td>

                {/* QTY */}
                <td>
                  <Input
                    type="number"
                    value={r.qty}
                    onChange={(e) =>
                      updateRow(r.id, "qty", Number(e.target.value))
                    }
                  />
                </td>

                {/* PRICE */}
                <td>
                  <Input
                    type="number"
                    value={r.price}
                    onChange={(e) =>
                      updateRow(r.id, "price", Number(e.target.value))
                    }
                  />
                </td>

                {/* TOTAL */}
                <td className="font-bold text-blue-600">
                  {r.qty * r.price}
                </td>

                {/* DELETE */}
                <td>
                  <button
                    onClick={() => removeRow(r.id)}
                    className="text-red-600"
                  >
                    ❌
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

        {/* ADD ROW */}
        <button
          onClick={addRow}
          className="mt-4 bg-blue-600 text-white px-4 py-2"
        >
          + Add Item
        </button>

        {/* TOTAL */}
        <h2 className="text-right mt-4 text-xl font-bold text-green-600">
          Total: {grandTotal.toFixed(2)}
        </h2>

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-3 bg-green-600 text-white px-6 py-2 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : editingPurchase
            ? "Update Purchase"
            : "Save Purchase"}
        </button>

      </div>
    </div>
  );
};

export default PurchaseUi;