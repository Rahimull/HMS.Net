import { useEffect, useMemo, useState } from "react";
import SaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";

/* ================= STATUS ================= */
const getStatus = (isPaid) =>
  isPaid
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";

/* ================= MAIN COMPONENT ================= */
const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedSale, setSelectedSale] = useState(null);
  const [showView, setShowView] = useState(false);

  /* LOAD */
  useEffect(() => {
    SaleApi.getPaged({ page: 1, pageSize: 100 })
      .then(res => setSales(res?.data?.data?.data || []));
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return sales.filter(s => {
      const matchSearch =
        s.id?.toString().includes(search) ||
        s.patientName?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "paid"
          ? s.isPaid
          : !s.isPaid;

      return matchSearch && matchStatus;
    });
  }, [sales, search, statusFilter]);

  /* VIEW */
  const handleView = (sale) => {
    setSelectedSale(sale);
    setShowView(true);
  };

  /* PRINT */
  const handlePrint = (sale) => {
    setSelectedSale(sale);
    setTimeout(() => window.print(), 300);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete this invoice?")) return;

    await SaleApi.delete(id);
    setSales(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

        <div>
          <h1 className="text-xl font-bold">🏥 Sales Management</h1>
          <p className="text-sm text-gray-500">
            Hospital ERP - Pharmacy Module
          </p>
        </div>

        <div className="flex gap-3 items-center">

          <Input
            placeholder="Search invoice / patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white mt-4 rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(sale => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-medium">
                  INV-{sale.id}
                </td>

                <td className="p-3">
                  {new Date(sale.saleDate).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {sale.patientName || "Walk-in"}
                </td>

                <td className="p-3">
                  {sale.doctorName || "-"}
                </td>

                <td className="p-3 font-semibold text-emerald-600">
                  {sale.totalAmount} AFN
                </td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatus(sale.isPaid)}`}>
                    {sale.isPaid ? "Paid" : "Unpaid"}
                  </span>
                </td>

                <td className="p-3 flex justify-end gap-2">

                  <button
                    onClick={() => handleView(sale)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handlePrint(sale)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg"
                  >
                    Print
                  </button>

                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {showView && selectedSale && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[650px] rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-slate-900 text-white p-4">
              <h2 className="text-lg font-semibold">
                🧾 Invoice #{selectedSale.id}
              </h2>
              <p className="text-xs text-gray-300">
                {new Date(selectedSale.saleDate).toLocaleString()}
              </p>
            </div>

            {/* BODY */}
            <div className="p-5">

              <div className="grid grid-cols-2 text-sm mb-4">
                <div>Patient: {selectedSale.patientName || "-"}</div>
                <div>Doctor: {selectedSale.doctorName || "-"}</div>
              </div>

              <div className="border rounded-lg p-3 space-y-2 max-h-[300px] overflow-auto">

                {selectedSale.details?.map((d, i) => (
                  <div key={i} className="flex justify-between text-sm border-b py-1">
                    <span>{d.itemName}</span>
                    <span>{d.quantity} × {d.unitPrice}</span>
                    <span className="font-semibold">{d.totalPrice}</span>
                  </div>
                ))}

              </div>

              <div className="mt-4 font-bold text-lg flex justify-between">
                <span>Total</span>
                <span>{selectedSale.totalAmount} AFN</span>
              </div>

            </div>

            {/* FOOTER */}
            <div className="p-4 bg-gray-50 flex gap-2">

              <button
                onClick={() => setShowView(false)}
                className="w-full bg-gray-200 py-2 rounded-xl"
              >
                Close
              </button>

              <button
                onClick={() => window.print()}
                className="w-full bg-slate-900 text-white py-2 rounded-xl"
              >
                Print
              </button>

            </div>

          </div>

        </div>
      )}

      {/* PRINT STYLE */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

    </div>
  );
};

export default SalesList;