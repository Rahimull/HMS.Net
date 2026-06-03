import { useEffect, useMemo, useState } from "react";
import SaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import FilterCard from "@/components/filter/FilterCard";
import Label from "@/components/common/Label";



/* ================= STATUS ================= */
const getStatus = (isPaid) =>
  isPaid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700";

/* ================= MAIN COMPONENT ================= */
const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedSale, setSelectedSale] = useState(null);
  const [showView, setShowView] = useState(false);

  /* LOAD */
  useEffect(() => {
    SaleApi.getPaged({ page: 1, pageSize: 100 }).then((res) =>
      setSales(res?.data?.data?.data || []),
    );
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return sales.filter((s) => {
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
    setSales((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search  and Filter */}
      <FilterCard
        title="Sales Filters"
        subtitle="Filter pharmacy sales"
        onApply={() => console.log("Apply")}
        onReset={() => console.log("Reset")}
      >
        {/* SEARCH */}
        <div>
          <Label name="search" />
          <Input
            type="text"
            placeholder="Invoice / Patient"
            className="border-white/40"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
          />
        </div>

        {/* STATUS */}
        <div>
          <Label name="status" />
          <Input
            type="select"
            className="border-white/40"
            options={[{ label: "All", value:"all"}, { label: "Paid", value:"paid" }, { label: "Unpaid", value:"unpaid" }]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>

        {/* FROM DATE */}
        <div>
          <Label name="From date" />
          <Input type="date" className="border-white/40" />
        </div>

        {/* TO DATE */}
        <div>
          <Label name="to date" />
          <Input type="date" className="border-white/40" />
        </div>
      </FilterCard>

      {/* ================= TABLE ================= */}
      {/* <div className="bg-white mt-4 rounded-xl shadow overflow-hidden">
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
            {filtered.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">INV-{sale.id}</td>

                <td className="p-3">
                  {new Date(sale.saleDate).toLocaleDateString()}
                </td>

                <td className="p-3">{sale.patientName || "Walk-in"}</td>

                <td className="p-3">{sale.doctorName || "-"}</td>

                <td className="p-3 font-semibold text-emerald-600">
                  {sale.totalAmount} AFN
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatus(sale.isPaid)}`}
                  >
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
      </div> */}


      {/* ================= TABLE ================= */}
<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-4">

  {/* TABLE HEADER */}
  <div className="flex items-center justify-between p-5 border-b border-gray-100">

    <div>
      <h2 className="text-lg font-semibold text-gray-800">
        Sales List
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Pharmacy sales records
      </p>
    </div>

    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-all">
      Export
    </button>

  </div>

  {/* TABLE */}
  <div className="overflow-x-auto">

    <table className="w-full">

      {/* HEAD */}
      <thead className="bg-gray-50 border-b border-gray-100">

        <tr>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Invoice
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Date
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Patient
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Doctor
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Total
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Status
          </th>

          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
            Actions
          </th>

        </tr>

      </thead>

      {/* BODY */}
      <tbody>

        {filtered.map((sale) => (

          <tr
            key={sale.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-all"
          >

            {/* INVOICE */}
            <td className="px-6 py-4">

              <div className="font-medium text-gray-800">
                INV-{sale.id}
              </div>

            </td>

            {/* DATE */}
            <td className="px-6 py-4 text-sm text-gray-600">

              {new Date(sale.saleDate).toLocaleDateString()}

            </td>

            {/* PATIENT */}
            <td className="px-6 py-4 text-sm text-gray-700">

              {sale.patientName || "Walk-in"}

            </td>

            {/* DOCTOR */}
            <td className="px-6 py-4 text-sm text-gray-700">

              {sale.doctorName || "-"}

            </td>

            {/* TOTAL */}
            <td className="px-6 py-4">

              <span className="font-semibold text-emerald-600">
                {sale.totalAmount} AFN
              </span>

            </td>

            {/* STATUS */}
            <td className="px-6 py-4">

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sale.isPaid
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sale.isPaid ? "Paid" : "Unpaid"}
              </span>

            </td>

            {/* ACTIONS */}
            <td className="px-6 py-4">

              <div className="flex justify-end gap-2">

                <button
                  onClick={() => handleView(sale)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => handlePrint(sale)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all text-sm"
                >
                  Print
                </button>

                <button
                  onClick={() => handleDelete(sale.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-all text-sm"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* FOOTER */}
  <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">

    <p className="text-sm text-gray-500">
      Total Records:{" "}
      <span className="font-medium text-gray-700">
        {filtered.length}
      </span>
    </p>

    <div className="flex items-center gap-2">

      <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-sm transition-all">
        Previous
      </button>

      <button className="w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium">
        1
      </button>

      <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-sm transition-all">
        Next
      </button>

    </div>

  </div>

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
                  <div
                    key={i}
                    className="flex justify-between text-sm border-b py-1"
                  >
                    <span>{d.itemName}</span>
                    <span>
                      {d.quantity} × {d.unitPrice}
                    </span>
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
