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
    <div className="flex flex-col gap-4 p-2 bg-gray-100 min-h-screen">
      {/* LEFT PANEL FOR FUPPLIER INFORMATIONS */}
      
        <PurchaseHeader
          header={header}
          setHeader={setHeader}
          supplierOptions={supplierOptions}
        />

        
     

      {/* RIGHT PANEL FOR ITEMS INFORMATIONS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <PurchaseTable
          lines={lines}
          itemOptions={itemOptions}
          updateLine={updateLine}
          removeLine={removeLine}
          addLine={addLine}
        />
        <PurchaseSummary
          total={total}
          loading={loading}
          onSave={save}
        />
      </div>
    </div>
  );
};

export default PurchaseUi;