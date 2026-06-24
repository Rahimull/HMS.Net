import Input from "@/components/common/Input";
import React from "react";



const PurchaseLine = ({line, itemOptions, updateLine, removeLine})=>{



    return(
        <div className="grid grid-cols-7 gap-1 py-2 border-b">

            {/* ITME */}
            <div>
                <Input 
                    type="select"
                    required="true"
                    value={line.itemId}
                    options={itemOptions}
                    onChange={(e)=> updateLine(line.id, "itemId", e.target.value)}
                />
                {line.error?.itemId && (
                    <span className="text-red-500 text-xs">  {line.error.itemId}</span>
                )}
            </div>
            {/* QTY */}
            <Input 
                    type="number"
                    value={line.qty}
                    onChange={(e)=> updateLine(line.id, "qty", e.target.value)}
                />

            {/* PRICE */}
            <Input 
                    type="number"
                    value={line.price}
                    onChange={(e)=> updateLine(line.id, "price", e.target.value)}
                />
            {/* SALE PRICE */}
            <Input 
                    type="number"
                    value={line.salePrice}
                    onChange={(e)=> updateLine(line.id, "salePrice", e.target.value)}
                />

            {/* EXPIRY */}
            <Input 
                    type="date"
                    value={line.expiryDate}
                    onChange={(e)=> updateLine(line.id, "expiryDate", e.target.value)}
                />
            {/* BAR CODE */}
            <Input 
                    type="text"
                    value={line.barCode}
                    onChange={(e)=> updateLine(line.id, "barCode", e.target.value)}
                />

            {/* TOTAL + DELETE */}
            <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">
                    {(line.qty * line.price).toFixed(2)}
                </span>
                <button 
                    type="button"
                    onClick={()=> removeLine(line.id)}
                    className="text-red-600">
                    ✖
                    </button>
            </div>
            
        </div>
    );

}
export default React.memo(PurchaseLine);