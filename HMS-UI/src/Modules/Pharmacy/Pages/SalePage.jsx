import { useEffect, useMemo, useState } from "react";
import SaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import FilterCard from "@/components/filter/FilterCard";
import Label from "@/components/common/Label";
import DataTable from "@/components/common/DataTable";
import useCrud from "@/hooks/useCurd";

/* ================= MAIN COMPONENT ================= */
const SalesList = () => {
  const [toast, setToast] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedSale, setSelectedSale] = useState(null);
  const [showView, setShowView] = useState(false);

  /* ================= FILTER DATA ================= */
  const filters = useMemo(
    () => ({
      status: statusFilter,
      fromDate,
      toDate,
    }),
    [statusFilter, fromDate, toDate],
  );

  /* ================= LOAD DATA ================= */

  const {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    loading,
    deleteItem,
  } = useCrud(SaleApi, { filters });

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

  // TABLE DATA AND COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "invoice",
        enableSorting: true,
        cell: ({ row }) => <span>INV-{row.original.id}</span>,
      },
      {
        accessorKey: "saleDate",
        header: "Date",
        cell: ({ row }) => (
          <span>{new Date(row.original.saleDate).toLocaleDateString()}</span>
        ),
      },
      {
        accessorKey: "patient",
        header: "patient",
        cell: ({ row }) => row.original.patient || "Walk-in",
      },
      {
        accessorKey: "doctor",
        header: "doctor",
        cell: ({ row }) => row.original.doctor || "-",
      },
      {
        accessorKey: "totalAmount",
        header: "total",
        cell: ({ row }) => (
          <span className="font-semibold text-emerald-600">
            {row.original.totalAmount} AFN
          </span>
        ),
      },
      {
        accessorKey: "totalProfit",
        header: "Profit",
        cell: ({ row }) => (
          <span className="font-semibold text-emerald-600">
            {row.original.totalProfit} AFN
          </span>
        ),
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
      },
      {
        accessorKey: "paidAmount",
        header: "Paid",
      },
      {
        accessorKey: "remainingAmount",
        header: "Remaining",
      },
      {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.paymentStatus;

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === "Paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : status === "PartialPaid"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },
    ],
    [],
  );

  const summary = useMemo(() => {
    return data.reduce(
      (acc, sale) => {
        acc.totalSales += Number(sale.totalAmount || 0);
        acc.totalProfit += Number(sale.totalProfit || 0);

        return acc;
      },
      {
        totalSales: 0,
        totalProfit: 0,
      },
    );
  }, [data]);

  const headerContent = (
    <>
      <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 min-w-[180px]">
        <p className="text-xs text-gray-500">Total Sales Amount</p>

        <p className="text-lg font-bold text-blue-700">
          {summary.totalSales.toLocaleString()} AF
        </p>
      </div>

      <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 min-w-[180px]">
        <p className="text-xs text-gray-500">Total Profit</p>

        <p className="text-lg font-bold text-green-700">
          {summary.totalProfit.toLocaleString()} AF
        </p>
      </div>
    </>
  );

  // ACTIONS
  const actions = useMemo(
    () => [
      {
        label: "View",
        className: "text-blue-400",
        icon: "👁",
        onClick: (row) => handleView(row),
      },
      {
        label: "Print",
        className: "text-green-400",
        icon: "✏️",
        onClick: (row) => handlePrint(row.id),
      },
      {
        label: "Delete",
        icon: "🗑",
        danger: true,
        onClick: (row) => deleteItem(row.id),
      },
    ],
    [deleteItem],
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search  and Filter */}
      <FilterCard
        title="Sales Filters"
        subtitle="Filter pharmacy sales"
        onApply={() => console.log("Apply")}
        onReset={() => {
          setSearch("");
          setStatusFilter("all");
          setFromDate("");
          setToDate("");

          setPagination((p) => ({
            ...p,
            pageIndex: 0,
          }));
        }}
      >
        {/* SEARCH */}
        <div>
          <Label name="search" />
          <Input
            type="text"
            placeholder="Invoice / Patient"
            className="border-white/40"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* STATUS */}
        <div>
          <Label name="status" />
          <Input
            type="select"
            className="border-white/40"
            options={[
              { label: "All", value: "all" },
              { label: "Paid", value: "paid" },
              { label: "Unpaid", value: "unpaid" },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>

        {/* FROM DATE */}
        <div>
          <Label name="From date" />
          <Input
            type="date"
            className="border-white/40"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* TO DATE */}
        <div>
          <Label name="to date" />
          <Input
            type="date"
            className="border-white/40"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </FilterCard>

      {/* ================= TABLE ================= */}
      <DataTable
        columns={columns}
        actions={actions}
        data={data}
        title="Sales List"
        subTitle="Pharmacy sales record"
        pagination={pagination}
        totalCount={totalCount}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={loading}
        headerContent={headerContent}
      />

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}

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
