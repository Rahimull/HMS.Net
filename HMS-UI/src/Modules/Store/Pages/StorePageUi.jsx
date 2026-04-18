import { useState } from "react";

const Card = ({ children }) => (
  <div className="bg-white shadow rounded-2xl p-6">{children}</div>
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    {children}
  </button>
);

export default function StorePageUi() {
  const [purchase, setPurchase] = useState({
    supplier: "",
    notes: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        item: "",
        batch: "",
        expiry: "",
        qty: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    const updated = items.map((i) => {
      if (i.id === id) {
        const newItem = { ...i, [field]: value };
        newItem.total = newItem.qty * newItem.price;
        return newItem;
      }
      return i;
    });
    setItems(updated);
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const totalAmount = items.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Store Purchase (Advanced)</h1>

      <Card>
        <div className="space-y-6">

          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="supplier"
              placeholder="Supplier"
              value={purchase.supplier}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="date"
              value={purchase.date}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="notes"
              placeholder="Notes"
              value={purchase.notes}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Items Table */}
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Items</h2>
              <Button onClick={addItem}>+ Add Item</Button>
            </div>

            <table className="w-full text-left border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">Item</th>
                  <th className="p-2">Batch</th>
                  <th className="p-2">Expiry</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">SubTotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b">
                    <td className="p-2">
                      <input
                        value={i.item}
                        onChange={(e) => updateItem(i.id, "item", e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={i.batch}
                        onChange={(e) => updateItem(i.id, "batch", e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={i.expiry}
                        onChange={(e) => updateItem(i.id, "expiry", e.target.value)}
                        className="p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={i.qty}
                        onChange={(e) => updateItem(i.id, "qty", +e.target.value)}
                        className="p-1 border rounded w-20"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={i.price}
                        onChange={(e) => updateItem(i.id, "price", +e.target.value)}
                        className="p-1 border rounded w-24"
                      />
                    </td>
                    <td className="p-2 font-medium">{i.total}</td>
                    <td className="p-2">
                      <Button onClick={() => removeItem(i.id)}>X</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Total: {totalAmount}</div>
            <Button>Save Purchase</Button>
          </div>

        </div>
      </Card>
    </div>
  );
}