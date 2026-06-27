import Button from "@/components/common/Button";
import CartItem from "./CartItem";

const Cart = ({
  cartTitle = "Live Cart",
  cart,
  items,
  setCart,
  changeBatch,
  updateQty,
}) => {
  return (
    <div className="w-[350px] bg-white border-l flex flex-col">
      <div className="p-4 border-b flex justify-between">
        <h2 className="font-bold">🛒 {cartTitle}</h2>
        <span className="text-xs">{cart.length} items</span>
      </div>
      <div className="flex-l overflow-auto p-3 space-y-2">
        {cart.length == 0 && (
          <p className="text-center text-gray-400 mt-10">Cart is empty</p>
        )}

        {
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {cart.map((line, idx) => {
              const item = items.find((i) => i.itemId === line.itemId);

              return (
                <CartItem
                  key={idx}
                  line={line}
                  item={item}
                  setCart={setCart}
                  changeBatch={changeBatch}
                  updateQty={updateQty}
                />
              );
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
