
import { useState } from "react";

const Card = ({ children }) => (
  <div className="bg-white shadow rounded-xl p-4">{children}</div>
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    {children}
  </button>
);

export default function StockManagement() {
  const [activeTab, setActiveTab] = useState("stock");

  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      item: "Paracetamol",
      batch: "B-100",
      quantity: 5,
      expiry: "2026-05-01",
      location: "A1",
    },
    {
      id: 2,
      item: "Amoxicillin",
      batch: "B-200",
      quantity: 50,
      expiry: "2025-12-01",
      location: "B2",
    },
  ]);

  const [form, setForm] = useState({
    item: "",
    batch: "",
    quantity: "",
    expiry: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStock = () => {
    if (!form.item || !form.quantity) return;

    setStockItems([
      ...stockItems,
      {
        id: Date.now(),
        ...form,
        quantity: Number(form.quantity),
      },
    ]);

    setForm({ item: "", batch: "", quantity: "", expiry: "", location: "" });
  };

  const isLowStock = (qty) => qty <= 10;

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Store - Advanced Stock Management</h1>

      {/* STOCK SECTION */}
      <Card>
        <h2 className="font-bold mb-4">Item Stock</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-2 rounded"
          />

          <input
            name="batch"
            value={form.batch}
            onChange={handleChange}
            placeholder="Batch Number"
            className="border p-2 rounded"
          />

          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            type="number"
            className="border p-2 rounded"
          />

          <input
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            type="date"
            className="border p-2 rounded"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
          />
        </div>

        <div className="mt-4">
          <Button onClick={addStock}>Add Stock</Button>
        </div>
      </Card>

      {/* STOCK TABLE */}
      <Card>
        <h2 className="font-bold mb-4">Stock Overview</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Item</th>
              <th>Batch</th>
              <th>Qty</th>
              <th>Expiry</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((s) => (
              <tr key={s.id} className="border-b">
                <td>{s.item}</td>
                <td>{s.batch}</td>
                <td
                  className={isLowStock(s.quantity) ? "text-red-600 font-bold" : ""}
                >
                  {s.quantity}
                </td>
                <td
                  className={isExpired(s.expiry) ? "text-red-600 font-bold" : ""}
                >
                  {s.expiry}
                </td>
                <td>{s.location}</td>
                <td>
                  {isExpired(s.expiry)
                    ? "Expired"
                    : isLowStock(s.quantity)
                    ? "Low Stock"
                    : "OK"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}