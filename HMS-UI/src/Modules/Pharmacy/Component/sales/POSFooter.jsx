const POSFooter = ({
  discount,
  setDiscount,
  subtotal,
  totalProfit,
  cart,
  setShowInvoice,
}) => {
  return (
    <div className="p-4 border-t">
      <div className="flex">
        <input
          className="w-full border mt-2 px-2 py-1 text-xs"
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) =>
            setDiscount(+e.target.value)
          }
        />
      </div>

      <div className="flex justify-between">
        <span>Total</span>

        <span>{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-green-600 font-bold">
        <span>Profit</span>

        <span>{totalProfit.toFixed(2)}</span>
      </div>

      <button
        onClick={() => setShowInvoice(true)}
        disabled={!cart.length}
        className="w-full mt-3 bg-black text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default POSFooter;