import InvoiceModel from "./Component/InvoiceModel";
import POSHeader from "./Component/sales/POSHeader";
import ItemGrid from "./Component/sales/ItemGrid";
import Cart from "./Component/sales/Cart";
import POSFooter from "./Component/sales/POSFooter";

const PharmacyPageUI = (props) => {
  return (
    <div className="h-screen flex bg-gray-100">
      <div className="flex-1 flex flex-col">
        <POSHeader
          search={props.search}
          setSearch={props.setSearch}
          handleBarcodeScan={props.handleBarcodeScan}
        />

        <ItemGrid filtered={props.filtered} addToCart={props.addToCart} />
      </div>

      <div className="w-[350px] bg-white border-l flex flex-col">
        <Cart
          cart={props.cart}
          items={props.items}
          setCart={props.setCart}
          changeBatch={props.changeBatch}
          updateQty={props.updateQty}
        />

        <POSFooter
          discount={props.discount}
          setDiscount={props.setDiscount}
          subtotal={props.subtotal}
          totalProfit={props.totalProfit}
          cart={props.cart}
          setShowInvoice={props.setShowInvoice}
        />
      </div>

      {props.subtotal}

      {props.showInvoice && (
        <InvoiceModel
          cart={props.cart}
          total={props.subtotal}
          onClose={() => props.setShowInvoice(false)}
          onConfirm={props.confirmSale}
          loading={props.loading}
        />
      )}
    </div>
  );
};

export default PharmacyPageUI;
