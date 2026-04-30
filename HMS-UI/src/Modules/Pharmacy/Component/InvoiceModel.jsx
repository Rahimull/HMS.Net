const InvoiceModel = ({cart, total, onClose, onConfirm, loading}) => {
    const tax = 0;
    const grandTotal = total + tax
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-white w-[520px] rounded-2xl shadow-2xl overflow-hidden">
          <InvoiceHeader />

          <div className="p-5">
            <InvoiceItems cart={cart} />
            <InvoiceSummary total={total} tax={tax} grandTotal={grandTotal} />
          </div>

          <InvoiceActions
            onClose={onClose}
            onConfirm={onConfirm}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};
export default InvoiceModel;
