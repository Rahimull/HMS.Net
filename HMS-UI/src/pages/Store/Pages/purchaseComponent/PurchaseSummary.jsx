


const PurchaseSummary = ({total, loading, onSave})=>{

    return(
        <>
            <div >
                <div className="mt-6 p-3 bg-green-100 rounded">
                <div className="text-sm">
                    Total
                </div>
                <div className="text-2xl font-bold text-green-700">
                    {total.toFixed(2)}
                </div>
            </div>
            <button 
                onClick={onSave}
                disabled={loading}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded desabled:opcity-50"
            >
                {loading ? "Saving..." : "confirm Order"}
            </button>
            </div>
        </>
    );
}

export default PurchaseSummary;