const InvoiceItemRow = ({item})=>{
    return (
        <>
            <div className="grid grid-cols-12 text-sm py-2 border-b">
                <div className="col-span-6 truncate">{item.itemName}</div>
                <div className="col-span-2 text-center">{item.qty}</div>
                <div className="col-span-4 text-right font-semibold">{(item.qty * item.price).toFixed(2)}</div>
            </div>
        </>
    );
}

export default InvoiceItemRow;