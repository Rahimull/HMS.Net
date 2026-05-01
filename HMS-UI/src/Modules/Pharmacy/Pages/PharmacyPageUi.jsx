import { useEffect, useMemo, useState } from "react";
import CurrentStockApi from "@/api/store/CurrentStockApi";
import PharmacySaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import InvoiceModel from "../Component/InvoiceModel";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/common/Card";
/* ================= STATUS ================= */
const getStatus = (qty) => {
  if (qty === 0) return "bg-red-500";
  if (qty < 10) return "bg-orange-400";
  if (qty < 50) return "bg-yellow-400";
  return "bg-emerald-500";
};

/* ================= MAIN POS ================= */
const PharmacyPOS = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [loading, setLoading] = useState(false);

  /* LOAD STOCK */
  useEffect(() => {
    CurrentStockApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setItems(res?.data?.data?.data || []),
    );
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return items.filter((x) =>
      x.itemName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  /* ADD TO CART */
  const addToCart = (item) => {
    if (item.quantity === 0) return;

    setCart((prev) => {
      const exist = prev.find((c) => c.itemId === item.itemId);

      if (exist) {
        return prev.map((c) =>
          c.itemId === item.itemId
            ? { ...c, qty: Math.min(c.qty + 1, item.quantity) }
            : c,
        );
      }

      return [
        ...prev,
        {
          itemId: item.itemId,
          itemName: item.itemName,
          price: item.price || 0,
          qty: 1,
          max: item.quantity,
        },
      ];
    });
  };

  /* UPDATE QTY */
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.itemId === id
            ? { ...c, qty: Math.max(0, Math.min(qty, c.max)) }
            : c,
        )
        .filter((c) => c.qty > 0),
    );
  };

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  /* CONFIRM SALE → BACKEND */
  const confirmSale = async () => {
    try {
      setLoading(true);

      const payload = {
        saleDate: new Date(),
        isPaid: true,
        details: cart.map((i) => ({
          itemId: i.itemId,
          quantity: i.qty,
          unitPrice: i.price,
          discount: 0,
        })),
      };

      await PharmacySaleApi.create(payload);

      setCart([]);
      setShowInvoice(false);
    } catch (err) {
      console.error(err);
      alert("Sale Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 text-gray-800">
      {/* ================= PRODUCTS ================= */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex justify-between">
          <div>
            <h1 className="text-lg font-bold">🏥 Pharmacy ERP POS</h1>
            <p className="text-xs text-gray-500">Enterprise Hospital System</p>
          </div>

          <div className="w-[320px]">
            <Input
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* GRID SHOW CARD EVERY ROW 3 CARD */}
        <div className="p-6 grid grid-cols-3 gap-4 overflow-auto">
          {filtered.map((item) => (
            <Card
              key={item.itemId}
              hover
              className="cursor-pointer group"
              onClick={() => addToCart(item)}
            >
              {/* SYSTEM HEADER */}
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                <span>HMS Pharmacy</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              {/* TOP */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {item.itemName}
                </span>

                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${getStatus(
                    item.quantity,
                  )}`}
                />
              </div>
              {/* STOCK */}
              <p className="text-xs text-gray-500 mt-2">
                Stock:{" "}
                <span className="text-gray-700 font-medium">
                  {item.quantity}
                </span>
              </p>
              <p>
                <span>Farzan</span>
              </p>

              {/* PRICE */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-emerald-600 font-semibold text-sm">
                  {item.unitPrice} 100 AFN
                </span>

                <span className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition">
                  add →
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= CART ================= */}
      <div className="w-[300px] bg-white border-l flex flex-col">
        <div className="p-4 border-b font-bold">🛒 Live Cart</div>

        <div className="flex-1 overflow-auto p-3 space-y-2">
          {cart.length === 0 && (
            <p className="text-center text-gray-400 mt-10">Cart is empty</p>
          )}

          {cart.map((i) => (
            <div key={i.itemId} className="border rounded-xl p-3">
              <div className="flex justify-between">
                <span>{i.itemName}</span>
                <span className="font-bold">
                  {(i.qty * i.price).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => updateQty(i.itemId, i.qty - 1)}
                  className="bg-red-500 text-white w-7 h-7 rounded"
                >
                  -
                </button>
                <span>{i.qty}</span>
                <button
                  onClick={() => updateQty(i.itemId, i.qty + 1)}
                  className="bg-green-500 text-white w-7 h-7 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span>Total</span>
            <span className="font-bold text-lg">{subtotal.toFixed(2)} AFN</span>
          </div>

          <button
            onClick={() => setShowInvoice(true)}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold"
          >
            Create Invoice
          </button>
        </div>
      </div>

      {/* INVOICE */}
      {showInvoice && (
        <InvoiceModel
          cart={cart}
          total={subtotal}
          onClose={() => setShowInvoice(false)}
          onConfirm={confirmSale}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PharmacyPOS;
