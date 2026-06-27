import { Card } from "@/components/common/Card";
import { getStatus } from "../../hooks/usePharmacyPOS";

const ItemGrid = ({ filtered, addToCart }) => {
  return (
    <div className="p-6 grid grid-cols-3 gap-4 overflow-auto">
      {filtered.map((item) => (
        <Card
          key={item.itemId}
          hover
          className="cursor-pointer group"
          onClick={() => addToCart(item)}
        >
          <div className="flex justify-between text-[10px] text-gray-400 mb-2">
            <span>HMS Pharmacy</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold truncate">
              {item.itemName}
            </span>

            <span
              className={`w-2.5 h-2.5 rounded-full ${getStatus(
                item.quantity,
              )}`}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Stock: {item.quantity}
          </p>

          <p className="text-xs text-emerald-600 font-semibold">
            Sale Price: {item.batches[0]?.salePrice}
          </p>

          <p className="text-xs text-gray-400">
            Barcode: {item.barcode}
          </p>

          <p className="text-xs text-gray-400">
            Batches: {item.batches.length}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ItemGrid;