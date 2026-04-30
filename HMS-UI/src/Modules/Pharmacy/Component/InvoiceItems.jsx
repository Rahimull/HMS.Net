import InvoiceItemRow from "./InvoiceItemRow";

const InvoiceItem = ({cart}) =>{
    return(
        <>
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 border-b pb-2">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-4 text-right">Total</div>
            </div>
            <div className="max-h[260px] overflow-auto mt-3 space-y-2">
                {cart.map(i => (
                    <InvoiceItemRow key={i.itemId} item={i} />
                ))}
            </div>
        </>
    );
}
export default InvoiceItem;