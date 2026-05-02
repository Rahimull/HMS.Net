import { useEffect, useMemo, useState } from "react";
import CurrentStockApi from "@/api/store/CurrentStockApi";
import PharmacySaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import InvoiceModel from "../Component/InvoiceModel";
import { Card } from "@/components/common/Card";

/* ================= STATUS ================= */
const getStatus = (qty) => {
  if (qty === 0) return "bg-red-500";
  if (qty < 10) return "bg-orange-400";
  if (qty < 50) return "bg-yellow-400";
  return "bg-emerald-500";
};

const PharmacyPOS = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [loading, setLoading] = useState(false);

  /* LOAD STOCK */
  useEffect(() => {
    CurrentStockApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setItems(res?.data?.data?.data || [])
    );
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return items.filter((x) =>
      x.itemName?.toLowerCase().includes(search.toLowerCase())
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
            : c
        );
      }

      return [
        ...prev,
        {
          itemId: item.itemId,
          itemName: item.itemName,
          price: item.itemPrice || 0,
          qty: 1,
          max: item.quantity,
        },
      ];
    });
  };

  /* UPDATE QTY */
  const updateQty = (id, qty, max) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.itemId === id
            ? { ...c, qty: Math.max(0, Math.min(qty, c.max)) }
            : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  /* CONFIRM SALE */
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
    <div className="h-screen flex bg-gray-100">

      {/* ================= LEFT: PRODUCTS ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">🏥 Pharmacy POS</h1>
            <p className="text-xs text-gray-500">Fast selling system</p>
          </div>

          <div className="w-[300px]">
            <Input
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* GRID */}
        <div className="p-6 grid grid-cols-3 gap-4 overflow-auto">

          {filtered.map((item) => (
            <Card
              key={item.itemId}
              hover
              className="cursor-pointer group"
              onClick={() => addToCart(item)}
            >

              {/* HEADER SMALL */}
              <div className="flex justify-between text-[10px] text-gray-400 mb-2">
                <span>HMS Pharmacy</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              {/* TITLE */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold truncate">
                  {item.itemName}
                </span>

                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1 ${getStatus(
                    item.quantity
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

              {/* PRICE */}
              <div className="mt-3 flex justify-between items-center">
                <span className="text-emerald-600 font-semibold text-sm">
                  {item.itemPrice} AFN
                </span>

                <span className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition">
                  add →
                </span>
              </div>

            </Card>
          ))}

        </div>
      </div>

      {/* ================= RIGHT: CART ================= */}
     <div className="w-[320px] bg-white border-l flex flex-col">

  {/* HEADER */}
  <div className="p-4 border-b flex justify-between items-center">
    <div>
      <h2 className="font-bold">🛒 Cart</h2>
      <p className="text-xs text-gray-500">{cart.length} items</p>
    </div>

    <button
      onClick={() => setCart([])}
      className="text-xs text-red-500 hover:underline"
    >
      Clear
    </button>
  </div>

  {/* ITEMS */}
  <div className="flex-1 overflow-auto p-3 space-y-2">

    {cart.length === 0 && (
      <p className="text-center text-gray-400 mt-10">
        No items selected
      </p>
    )}

    {cart.map((i) => (
      <div
        key={i.itemId}
        className="border rounded-xl p-3 hover:bg-gray-50 transition"
      >

        {/* TOP */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-semibold truncate">
              {i.itemName}
            </p>

            <p className="text-xs text-gray-400">
              {i.price} AFN × {i.qty}
            </p>
          </div>

          <button
            onClick={() => updateQty(i.itemId, 0)}
            className="text-xs text-red-500 hover:underline"
          >
            ✕
          </button>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-between mt-3">

          <div className="flex items-center gap-2">

            <button
              onClick={() => updateQty(i.itemId, i.qty - 1)}
              className="
                w-7 h-7 rounded bg-red-500 text-white
                flex items-center justify-center
              "
            >
              -
            </button>

            <span className="w-6 text-center font-medium">
              {i.qty}
            </span>

            <button
              onClick={() => updateQty(i.itemId, i.qty + 1)}
              className="
                w-7 h-7 rounded bg-green-500 text-white
                flex items-center justify-center
              "
            >
              +
            </button>

          </div>

          {/* LINE TOTAL */}
          <span className="font-semibold text-emerald-600 text-sm">
            {(i.qty * i.price).toFixed(2)} AFN
          </span>

        </div>

      </div>
    ))}
  </div>

  {/* FOOTER / CHECKOUT */}
  <div className="p-4 border-t space-y-3">

    <div className="flex justify-between font-semibold">
      <span>Total</span>
      <span className="text-lg">
        {subtotal.toFixed(2)} AFN
      </span>
    </div>

    <button
      onClick={() => setShowInvoice(true)}
      disabled={cart.length === 0}
      className="
        w-full py-3 rounded-xl
        bg-slate-900 text-white font-semibold
        hover:bg-slate-800 transition
        disabled:opacity-50
      "
    >
      Checkout
    </button>

  </div>

</div>




      {/* ================= INVOICE ================= */}
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