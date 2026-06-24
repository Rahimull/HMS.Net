import Input from "@/components/common/Input";

const PurchaseHeader = ({ header, setHeader, supplierOptions }) => {
  const handleChange = (field, value) => {
    setHeader((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Purchase Order</h2>
          <p className="text-sm text-gray-500">
            Create and manage purchase orders
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input
          type="select"
          label="Vendor"
          value={header.supplierId}
          options={supplierOptions}
          onChange={(e) => handleChange("supplierId", e.target.value)}
        />
        <Input
          type="date"
          value={header.purchaseDate}
          label="Date"
          onChange={(e) => handleChange("purchaseDate", e.target.value)}
        />
        <Input
          type="text"
          value={header.notes}
          label="Notes"
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PurchaseHeader;
