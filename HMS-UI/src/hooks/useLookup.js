import { useEffect, useMemo, useState } from "react";
import SuplierApi from "@/api/store/SuplierApi";
import ItemApi from "@/api/store/ItemApi";

export default function usePurchaseLookup() {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [supplierRes, itemRes] = await Promise.all([
          SuplierApi.getPaged({
            pagination: {
              pageIndex: 0,
              pageSize: 1000,
            },
          }),
          ItemApi.getPaged({
            pagination: {
              pageIndex: 0,
              pageSize: 1000,
            }
          }),
        ]);

        setSuppliers(supplierRes.data.data.data || []);

        setItems(itemRes.data.data.data || []);
      } catch (error) {
        console.error("Error loading lookup data", error);
      } finally {
        setLoading(false);
      }
    };

    loadLookups();
  }, []);

  const supplierOptions = useMemo(
    () =>
      suppliers.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [suppliers],
  );


  
  const itemOptions = useMemo(
    () =>
      items.map((i) => ({
        label: i.name,
        value: i.id,
        price: i.price,
        category: i.categoryName,
        unit: i.unitName,
      })),
    [items],
  );
  
 
  return {
    suppliers,
    items,
    supplierOptions,
    itemOptions,
    loading,
  };
}
