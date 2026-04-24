import { useEffect, useState } from "react";
import usePurchase from "./usePurchases";
import SuplierApi from "@/api/store/SuplierApi";
import ItemApi from "@/api/store/ItemApi";
import Input from "@/components/common/Input";

const PurchaseUi = () => {
  const { createPurchase } = usePurchase();

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
    date: "",
  });

  /* ================= ROWS ================= */

  const [rows, setRows] = useState([]);

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

        // 🔥 auto price from item
        if (field === "itemId") {
          const item = itemOptions.find(
            (i) => i.value == value
          );

          if (item) {
            updated.price = item.price;
            updated.qty = updated.qty || 1;
          }
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

  /* ================= SAVE ================= */

  const handleSave = async () => {
    setLoading(true);

    try {
      const payload = {
        ...header,
        totalAmount: grandTotal,
        details: rows.map((r) => ({
          itemId: r.itemId,
          qty: r.qty,
          price: r.price,
          total: r.qty * r.price,
        })),
      };

      await createPurchase(payload);

      alert("Purchase Saved ✅");

      // reset
      setHeader({
        supplierId: "",
        notes: "",
        date: "",
      });

      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        🧾 Purchase Module (Production Ready)
      </h1>

      {/* ================= HEADER ================= */}
      <div className="bg-white p-5 rounded shadow grid grid-cols-3 gap-4">

        <Input
          name="supplierId"
          type="select"
          value={header.supplierId}
          options={supplierOptions}
          label="Supplier"
          onChange={(e) =>
            setHeader({
              ...header,
              supplierId: e.target.value,
            })
          }
        />

        <Input
          name="date"
          type="date"
          value={header.date}
          label="Date"
          onChange={(e) =>
            setHeader({
              ...header,
              date: e.target.value,
            })
          }
        />

        <Input
          name="notes"
          label="Notes"
          value={header.notes}
          onChange={(e) =>
            setHeader({
              ...header,
              notes: e.target.value,
            })
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
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-400"
                >
                  No items added yet
                </td>
              </tr>
            )}

            {rows.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-50 transition"
              >

                {/* ITEM */}
                <td>
                  <Input
                    name="itemId"
                    type="select"
                    value={r.itemId}
                    options={itemOptions}
                    onChange={(e) =>
                      updateRow(
                        r.id,
                        "itemId",
                        e.target.value
                      )
                    }
                  />
                </td>

                {/* QTY */}
                <td>
                  <Input
                    type="number"
                    value={r.qty}
                    onChange={(e) =>
                      updateRow(
                        r.id,
                        "qty",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>

                {/* PRICE */}
                <td>
                  <Input
                    type="number"
                    value={r.price}
                    onChange={(e) =>
                      updateRow(
                        r.id,
                        "price",
                        Number(e.target.value)
                      )
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
          + Add Row
        </button>

        {/* GRAND TOTAL */}
        <h2 className="text-right mt-4 text-xl font-bold text-green-600">
          Total: {grandTotal.toFixed(2)}
        </h2>

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-2 bg-green-600 disabled:bg-gray-400 text-white px-6 py-2"
        >
          {loading ? "Saving..." : "Save Purchase"}
        </button>

      </div>
    </div>
  );
};

export default PurchaseUi;