import { useEffect, useMemo, useState } from "react";
import ItemStockApi from "@/api/store/ItemStockApi";
import PharmacySaleApi from "@/api/pharmacy/SaleApi";

export const getStatus = (qty) => {
  if (qty === 0) return "bg-red-500";
  if (qty < 10) return "bg-orange-400";
  if (qty < 50) return "bg-yellow-400";
  return "bg-emerald-500";
};

const usePharmacyPos = () => {
  const [stocks, setStocks] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState();


 /* ================= LOAD ITEM STOCK ================= */
  useEffect(() => {
    ItemStockApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setStocks(res?.data?.data?.data || [])
    );
  }, []);


  /* ================= GROUP BY ITEMS ================= */
  const items = useMemo(() => {
    const map = {};

    stocks.forEach((s) => {
      const qty = Number(s.remainingQuantity) || 0;

      if (!map[s.itemId]) {
        map[s.itemId] = {
          itemId: s.itemId,
          itemName: s.itemName,
          quantity: 0,
          batches: [],
          barcode: s.barcode,
        };
      }

      map[s.itemId].quantity += qty;

      map[s.itemId].batches.push({
        id: s.id,
        batchNumber: s.batchNumber,
        buyPrice: s.buyPrice,
        salePrice: s.salePrice,
        qty: qty,
        expiryDate: s.expiryDate,
      });
    });

    return Object.values(map);
  }, [stocks]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return items.filter(
      (x) =>
        x.barcode?.toString() === term ||
        x.itemName?.toLowerCase().includes(term)
    );
  }, [items, search]);
  

  /* ================= ADD TO CART ================= */
  const addToCart = (item) => {
    const batch = item.batches[0];

    // FIX اصلی اینجاست
    if (!batch) return;

    setCart((prev) => {
      const exist = prev.find(
        (c) => c.itemId === item.itemId && c.batchId === batch.id
      );

      if (exist) {
        return prev.map((c) =>
          c.itemId === item.itemId && c.batchId === batch.id
            ? { ...c, qty: Math.min(c.qty + 1, c.max) }
            : c
        );
      }

      return [
        ...prev,
        {
          itemId: item.itemId,
          itemName: item.itemName,
          batchId: batch.id,
          batchNumber: batch.batchNumber,
          expiryDate: batch.expiryDate,
          buyPrice: batch.buyPrice,
          salePrice: batch.salePrice,
          qty: 1,
          max: batch.qty,
        },
      ];
    });
  };

  /* ================= CHANGE BATCH ================= */
  const changeBatch = (line, batchId) => {
    const item = items.find((i) => i.itemId === line.itemId);
    const batch = item.batches.find((b) => b.id == batchId);

    setCart((prev) =>
      prev.map((c) =>
        c === line
          ? {
              ...c,
              batchId: batch.id,
              batchNumber: batch.batchNumber,
              expiryDate: batch.expiryDate,
              buyPrice: batch.buyPrice,
              salePrice: batch.salePrice,
              max: batch.qty,
            }
          : c
      )
    );
  };

  /* ================= UPDATE QTY ================= */
  const updateQty = (line, qty) => {
    setCart((prev) =>
      prev.map((c) =>
        c === line
          ? { ...c, qty: Math.max(1, Math.min(qty, c.max)) }
          : c
      )
    );
  };

  /* ================= TOTALS ================= */
  const subtotal = cart.reduce((s, i) => s + i.qty * i.salePrice, 0);

  const totalProfit = cart.reduce(
    (s, i) => s + (i.salePrice - i.buyPrice) * i.qty,
    0
  );

  /* ================= CONFIRM SALE ================= */
  const confirmSale = async () => {
    try {
      setLoading(true);

      const total = subtotal;
      const paid = total;

      const payload = {
        saleDate: new Date(),
        paidAmount: paid,
        remainingAgmount: total - paid,
        paymentStatus: total - paid <= 0 ? 2 : paid > 0 ? 1 : 0,

        patientId: null,
        doctorId: null,
        prescriptionId: null,

        saleDetails: cart.map((i) => ({
          itemId: i.itemId,
          itemStockId: i.batchId,
          quantity: i.qty,
          unitPrice: i.salePrice,
          buyPrice: i.buyPrice,
          discount: 0,
        })),
      };

      await PharmacySaleApi.create(payload);

      setCart([]);
      setShowInvoice(false);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Sale Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BARCODE ================= */
  const handleBarcodeScan = (barcode) => {
    const clean = String(barcode).trim();

    const item = items.find(
      (x) => String(x.barcode).trim() === clean
    );

    if (!item) {
      alert("Barcode Not Found");
      return;
    }

    addToCart(item);
    setSearch("");
  };

  return {
    stocks,
    cart,
    setCart,
    search,
    setSearch,
    showInvoice,
    setShowInvoice,
    loading,
    discount,
    setDiscount,
    items,
    filtered,
    addToCart,
    changeBatch,
    updateQty,
    subtotal,
    totalProfit,
    confirmSale,
    handleBarcodeScan,
  };
};

export default usePharmacyPos;