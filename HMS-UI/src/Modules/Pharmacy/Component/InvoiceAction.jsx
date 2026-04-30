import Button from "@/components/common/Button";

const InvoiceAction = ({ onClose, onConfirm, loading }) => {
  return (
    <>
      <div className="flex gap-2 p-4 bg-gray-100">
        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-white border"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full py-2 rounded-xl bg-emerald-600 text-white font-semibold"
        >
          {loading ? "Processing..." : "Confirm Sale"}
        </button>
      </div>
    </>
  );
};
export default InvoiceAction;
