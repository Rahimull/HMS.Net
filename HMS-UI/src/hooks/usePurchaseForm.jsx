import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const emptyLine = () => ({
  id: Date.now() + Math.random(),
  itemId: "",
  qty: 1,
  price: 0,
  expiryDate: "",
  error: {},
});

export default function usePurchaseForm({
  itemOptions,
  editingPurchase,
  createPurchase,
  updatePurchase,
  onClearEdit,
}) {
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    supplierId: "",
    notes: "",
    purchaseDate: "",
  });

  const [lines, setLines] = useState([emptyLine()]);

  const itemMap = useMemo(
    () => Object.fromEntries(itemOptions.map((item) => [item.value, item])),
    [itemOptions],
  );

  const total = useMemo(
    () =>
      lines.reduce((sum, line) => sum + (line.qty || 0) * (line.price || 0), 0),
    [lines],
  );

  const resetForm = useCallback(() => {
    setHeader({
      supplierId: "",
      notes: "",
      purchaseDate: "",
    });

    setLines([emptyLine()]);
  }, []);

  const addLine = useCallback(() => {
    setLines((prev) => [...prev, emptyLine()]);
  }, []);

  const removeLine = useCallback((id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const updateLine = useCallback(
    (id, field, value) => {
      setLines((prev) =>
        prev.map((line) => {
          if (line.id !== id) return line;

          const updated = {
            ...line,
            [field]: value,
          };

          if (field === "itemId") {
            const item = itemMap[value];

            if (item) {
              updated.price = item.price;
            }
          }

          return updated;
        }),
      );
    },
    [itemMap],
  );

  /* ================= EDIT ================= */

  useEffect(() => {
    if (!editingPurchase) return;

    setHeader({
      supplierId: editingPurchase.supplierId,
      notes: editingPurchase.notes || "",
      purchaseDate: editingPurchase.purchaseDate?.split("T")[0] || "",
    });

    setLines(
      editingPurchase.details.map((detail) => ({
        id: detail.id,
        itemId: detail.itemId,
        qty: detail.quantity,
        price: detail.unitPrice,
        expiryDate: detail.expiryDate ? detail.expiryDate.split("T")[0] : "",
        error: {},
      })),
    );
  }, [editingPurchase]);

  /* ================= DRAFT LOAD ================= */

  useEffect(() => {
    if (editingPurchase) return;

    const draft = localStorage.getItem("purchase-draft");

    if (!draft) return;

    try {
      const parsed = JSON.parse(draft);

      setHeader(parsed.header);
      setLines(parsed.lines);
    } catch (error) {
      console.error("Invalid purchase draft", error);
    }
  }, [editingPurchase]);

  /* ================= DRAFT SAVE ================= */

  useEffect(() => {
    if (editingPurchase) return;

    const timer = setTimeout(() => {
      localStorage.setItem(
        "purchase-draft",
        JSON.stringify({
          header,
          lines,
        }),
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [header, lines, editingPurchase]);

  /* ================= SAVE ================= */

  const save = useCallback(async () => {
    if (!header.supplierId) {
      toast.warning("Please select supplier");
      return;
    }

    const validLines = lines.filter((line) => line.itemId);

    if (validLines.length === 0) {
      toast.warning("Please add at least on item");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        supplierId: Number(header.supplierId),

        purchaseDate: header.purchaseDate,

        notes: header.notes,

        details: validLines.map((line) => ({
          itemId: Number(line.itemId),
          quantity: Number(line.qty),
          unitPrice: Number(line.price),
          batchNumber: "",
          expiryDate: line.expiryDate || null,
        })),
      };

      if (editingPurchase) {
        await updatePurchase(editingPurchase.id, payload);
        toast.success("Purchase updated successfully");
      } else {
        await createPurchase(payload);
        toast.success("Purchase Created Succssfully");
      }

      localStorage.removeItem("purchase-draft");

      resetForm();

      onClearEdit?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Purchase save failed",
      );
    } finally {
      setLoading(false);
    }
  }, [
    header,
    lines,
    editingPurchase,
    createPurchase,
    updatePurchase,
    onClearEdit,
    resetForm,
  ]);

  return {
    header,
    setHeader,

    lines,

    total,
    loading,

    addLine,
    removeLine,
    updateLine,

    save,
    resetForm,
  };
}
