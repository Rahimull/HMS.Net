import PurchaseLine from "./PurchaseLine";



const PurchaseTable = ({
    lines, itemOptions, updateLine, removeLine, addLine
})=>{
    

    return(
        <>
            {/* HEADER */}
            <div className="grid grid-cols-5 text-sm font-bold border-b pb-2 mb-2">
                <div>Product</div>
                <div>Qty</div>
                <div>Price</div>
                <div>Expiry</div>
                <div>Total</div>
            </div>

            {/* LINES */}
            {lines.map((line) => (
                <PurchaseLine
                    key={line.id}
                    line={line}
                    itemOptions={itemOptions}
                    updateLine={updateLine}
                    removeLine={removeLine}
                />
            ))}

            {/* ADD LINE */}
            <button 
                type="button"
                onClick={addLine}
                className="mt-4 text-blue-600 font-bold"
            >
                + Add a line
            </button>
        </>
    );
}

export default PurchaseTable;