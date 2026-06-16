import Input from "@/components/common/Input";


const PurchaseHeader = ({
    header, setHeader, supplierOptions
})=>{

const handleChange = (field, value)=>{
    setHeader(prev => ({
        ...prev,
        [field]:value,
    }));

};
return(
    <>
        <h2 className="text-lg font-bold mb-4">Purchase Order</h2>

        <Input 
            type="select"
            label="Vendor"
            value={header.supplierId}
            options={supplierOptions}
            onChange={(e)=> handleChange("supplierId", e.target.value)}
        />
        <Input 
            type="date"
            value={header.purchaseDate}
            label="Date"
            onChange={(e)=> handleChange("purchaseDate", e.target.value)}
        />
        <Input 
            type="text"
            value={header.notes}
            label="Notes"
            onChange={(e)=> handleChange("notes", e.target.value)}
        />
    </>
);

}

export default PurchaseHeader;