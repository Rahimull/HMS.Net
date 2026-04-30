const InvoiceModel = ({ cart, total, onClose, onConfirm, loading }) => {
  const tax = 0;
  const grandTotal = total + tax;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white w-[520] rounded-2x1 shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-semibold">🧾 Pharmacy Invoice</h2>
          <p className="text-xs text-gray-400"> Hospital ERP System</p>
        </div>

        {/* ITEMS */}
        <div className="grid grid-cols-12 text-xs font-bold text-gray-500 border-b pb-2">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-4 text-right">Total</div>
        </div>
        <div className="max-h-[260px] overflow-auto mt-3 space-y-2">
            {cart.map(i => (
                <div key={i.itemId} className="grid grid-cols-12 border-b text-sm py-2"> 
                    <div className="col-span-6 truncate">{i.itemName}</div>
                    <div className="col-span-2 text-center">{i.qty}</div>
                    <div className="col-span-4 text-right font-semibold">{(i.qty * i.price).toFixed(2)}</div>
                </div>
            ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-5 bg-gray-50 p-4 rounded-xl text-sm space-y-2">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} Afg</span>
            </div>
            <div className="flex justify-between">
                <span>Tax</span>
                <span>{tax} Afg</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>{grandTotal.toFixed(2)} Afg</span>
            </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 p-4 bg-gray-100">
        <button onClick={onClose} className="w-full py-2 rounded-xl bg-white border">Cancel</button>
        <button onClick={onConfirm}
            disabled={loading}
            className="w-full py-2 rounded-xl bg-emerald-600 text-white font-semiblod"
        >
            {loading ? "Processing...": "Confirm Sale"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceModel;
