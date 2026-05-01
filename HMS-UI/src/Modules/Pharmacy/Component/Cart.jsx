import Button from "@/components/common/Button";

const Cart = ({ title = "Live Cart", cart }) => {
  return (
    <>
      <div className="w-[300px] bg-white border-l flex flex-col">
        <div className="p-4 border-b font-bold"> 🛒{title}</div>

        <div className="flex-l overflow-auto p-3 space-y-2">
          {cart.length == 0 && (
            <p className="text-center text-gray-400 mt-10"> Cart is empty</p>
          )}

          {cart.map((i) => (
            <div key={i.itemId} className="border rounded-xl p-3">
                <div className="flex justify-between">
                    <span>{i.itemName}</span>
                    <span className="font-bold">{(i.qty * I.price ).toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-2">
                    <Button  onClick={() => updateQty(i.itemId, i.qty - 1)} />
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
