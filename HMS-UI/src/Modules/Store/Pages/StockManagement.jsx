import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/common/Card";
import ItemApi from "@/api/store/ItemApi";
import ItemStockApi from "@/api/store/ItemStockApi";

export default function StockManagement() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!id) return;

  Promise.all([
    ItemApi.getById(id),
    ItemStockApi.getById(id),
  ])
    .then(([itemRes, stockRes]) => {
      // ✅ Item
      const itemData = itemRes.data.data;
      setItem(itemData);

      // ✅ ItemStock (ممکن است لیست باشد)
      const stockData = Array.isArray(stockRes.data.data)
        ? stockRes.data.data
        : [];

      setStocks(stockData);
    })
    .finally(() => setLoading(false));
}, [id]);



  if (loading) return <div>Loading...</div>;
  if (!item) return <div className="text-red-600">Item not found</div>;

  const totalStock = stocks.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Item Profile</h1>

      <Card>
        <div className="grid grid-cols-2 gap-4">
          <input disabled value={item.name} />
          <input disabled value={item.category} />
          <input disabled value={item.unit} />
          <input disabled value={totalStock} />
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold mb-4">Stock & Batches</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Batch</th>
              <th>Qty</th>
              <th>Location</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(s => (
              <tr key={s.stockId}>
                <td>{s.batchNumber}</td>
                <td>{s.quantity}</td>
                <td>{s.location}</td>
                <td>{s.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}