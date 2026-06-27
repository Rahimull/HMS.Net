const CartItem = ({
  line,
  item,
  setCart,
  changeBatch,
  updateQty,
}) => {
  return (
    <div className="border rounded-xl p-3">
      <div className="flex justify-between">
        <span className="text-sm font-semibold">
          {line.itemName}
        </span>

        <button
          onClick={() =>
            setCart((p) => p.filter((x) => x !== line))
          }
          className="text-red-500 text-xs"
        >
          ✕
        </button>
      </div>

      <select
        value={line.batchId}
        onChange={(e) =>
          changeBatch(line, e.target.value)
        }
        className="w-full border mt-2 px-2 py-1 text-xs rounded"
      >
        {item.batches.map((b) => (
          <option key={b.id} value={b.id}>
            {b.batchNumber} | Exp: {b.expiryDate} | Buy:
            {" "}
            {b.buyPrice}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={line.salePrice}
        onChange={(e) =>
          setCart((p) =>
            p.map((c) =>
              c === line
                ? {
                    ...c,
                    salePrice: Number(e.target.value),
                  }
                : c,
            ),
          )
        }
        className="w-full border mt-2 px-2 py-1 text-xs"
      />

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <button
            onClick={() =>
              updateQty(line, line.qty - 1)
            }
            className="w-6 h-6 bg-red-500 text-white"
          >
            -
          </button>

          <span>{line.qty}</span>

          <button
            onClick={() =>
              updateQty(line, line.qty + 1)
            }
            className="w-6 h-6 bg-green-500 text-white"
          >
            +
          </button>
        </div>

        <span className="text-emerald-600 font-bold text-sm">
          {(line.qty * line.salePrice).toFixed(2)}
        </span>
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Profit:
        {" "}
        <span className="text-emerald-600">
          {(
            (line.salePrice - line.buyPrice) *
            line.qty
          ).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;