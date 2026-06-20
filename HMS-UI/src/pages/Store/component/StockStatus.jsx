export default function StockStatus({item}){
    const status = item.quantity === 0 ? "OUT" : item.quantity < (item.minLevel ?? 10) ? "LOW" : "GOOD";

    const StatusStyle = status === "OUT" 
        ? "bg-red-100 text-red-700"
        : status === "LOW" ? "bg-yellow-100 text-yellow-700"
        : status === "GOOD" ? "bg-green-100 text-green-700" : "";

    const icon = status === "OUT"
        ? "⛔"
        : status === "LOW" ? "⚠️"
        : status === "GOOD" ? "✅" : "";

    return (
        <span className={`px-2 py-1 rounded text-xs font-bold ${StatusStyle}`}>{icon} {status}</span>
    );
}