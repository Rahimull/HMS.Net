import Input from "@/components/common/Input";

const POSHeader = ({
  search,
  setSearch,
  handleBarcodeScan,
}) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-bold">🏥 Pharmacy POS</h1>
        <p className="text-xs text-gray-500">
          Batch-based selling
        </p>
      </div>

      <div className="w-[300px]">
        <Input
          placeholder="Scan Barcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleBarcodeScan(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default POSHeader;