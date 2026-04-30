const InvoiceSummary = ({ total, tax, grandTotal }) => {
  return (
    <>
      <div className="mt-5 bg-gray-50 p-4 rounded-xl text-sm space-y-2">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>{tax} AFN</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>{grandTotal.toFixed(2)} AFN</span>
        </div>
      </div>
    </>
  );
};

export default InvoiceSummary;
