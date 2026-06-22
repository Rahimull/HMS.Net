import usePurchase from "./usePurchases";

import PurchaseHeader from "./purchaseComponent/PurchaseHeader";
import PurchaseSummary from "./purchaseComponent/PurchaseSummary";
import PurchaseTable from "./purchaseComponent/PurchaseTable";

import usePurchaseForm from "@/hooks/usePurchaseForm";
import usePurchaseLookup from "@/hooks/useLookup";


const PurchaseUi = ({
  editingPurchase,
  onClearEdit,
}) => {
  const {
    createPurchase,
    updatePurchase,
  } = usePurchase();

  const {
    supplierOptions,
    itemOptions,
    loading: lookupLoading,
  } = usePurchaseLookup();

  const {
    header,
    setHeader,
    lines,
    total,
    loading,
    addLine,
    removeLine,
    updateLine,
    save,
  } = usePurchaseForm({
    itemOptions,
    editingPurchase,
    createPurchase,
    updatePurchase,
    onClearEdit,
  });

  if (lookupLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

console.log("Items:", itemOptions);
  

  return (
    <div className="flex gap-4 p-2 bg-gray-100 min-h-screen">
      {/* LEFT PANEL FOR FUPPLIER INFORMATIONS */}
      <div className="w-1/4 bg-white p-4 rounded-xl shadow sticky top-4">
        <PurchaseHeader
          header={header}
          setHeader={setHeader}
          supplierOptions={supplierOptions}
        />

        <PurchaseSummary
          total={total}
          loading={loading}
          onSave={save}
        />
      </div>

      {/* RIGHT PANEL FOR ITEMS INFORMATIONS */}
      <div className="flex-1 bg-white p-4 rounded-xl shadow">
        <PurchaseTable
          lines={lines}
          itemOptions={itemOptions}
          updateLine={updateLine}
          removeLine={removeLine}
          addLine={addLine}
        />
      </div>
    </div>
  );
};

export default PurchaseUi;