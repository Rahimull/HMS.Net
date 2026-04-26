import { useEffect, useState } from "react";
import PurchaseApi from "@/api/store/PurchaseApi"

const usePurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await PurchaseApi.getPaged({
        page: 0,
        pageSize: 1000,
      });

      setPurchases(res.data.data.data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE ================= */

  const createPurchase = async (payload) => {
    console.log(payload)
    await PurchaseApi.create(payload);
    fetchPurchases();
  };

  /* ================= INIT ================= */

  useEffect(() => {
    fetchPurchases();
  }, []);

  return {
    purchases,
    loading,
    fetchPurchases,
    createPurchase,
  };
};

export default usePurchase;