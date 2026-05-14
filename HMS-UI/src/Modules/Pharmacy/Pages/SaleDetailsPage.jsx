import { useEffect, useMemo, useState } from "react";
import SaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";

/* ================= STATUS ================= */
const getStatus = (isPaid) =>
  isPaid
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";

/* ================= MAIN COMPONENT ================= */
const SalesList = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedSale, setSelectedSale] = useState(null);
  const [showView, setShowView] = useState(false);

  /* ================= TABLE STATES ================= */
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState(null);

  const [totalCount, setTotalCount] = useState(0);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);

    try {
      const res = await SaleApi.getPaged({
        pagination: {
          // اگر backend از 1 شروع می‌کند:
          pageIndex: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        },

        sortBy: sorting
          ? {
              sortBy: sorting.id,
              isDescending: sorting.desc,
            }
          : {
              sortBy: "id",
              isDescending: false,
            },

        search: {
          searchTerm: search,
        },
      });

      const pagedData = res?.data?.data;

      let data = pagedData?.data ?? [];

      /* ================= STATUS FILTER ================= */
      if (statusFilter === "paid") {
        data = data.filter((x) => x.isPaid === true);
      }

      if (statusFilter === "unpaid") {
        data = data.filter((x) => x.isPaid === false);
      }

      setSales(Array.isArray(data) ? data : []);

      setTotalCount(pagedData?.totalCount ?? 0);
    } catch (err) {
      console.log(err);

      setToast({
        message: "Failed to load sales",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    const delay = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(delay);
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    search,
    statusFilter,
  ]);

  /* ================= COLUMNS ================= */
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Invoice",
      },

      {
        accessorKey: "doctorName",
        header: "Doctor",
        cell: ({row})=> {
          return row.original.doctorName ? row.doctorName : "No Doctor" 
        }
      },
      {
        accessorKey: "patientName",
        header: "Patient",
        cell: ({row})=> {
          return row.original.patientName ? row.patientName : "Walk-in-customer" 
        }
      },

      {
        accessorKey: "discount",
        header: "Discount",
      },

      {
        accessorKey: "totalAmount",
        header: "Total",
      },

      {
        accessorKey: "totalProfit",
        header: "Profit",
      },

      {
        accessorKey: "saleDate",
        header: "Date",

        cell: ({ row }) => {
          return (
            <span>
              {new Date(row.original.saleDate).toLocaleString()}
            </span>
          );
        },
      },

      {
        accessorKey: "isPaid",
        header: "Status",

        cell: ({ row }) => {
          const isPaid = row.original.isPaid;

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(
                isPaid
              )}`}
            >
              {isPaid ? "Paid" : "Unpaid"}
            </span>
          );
        },
      },
    ],
    []
  );

  console.log(sales)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-xl font-bold">
            🏥 Sales Management
          </h1>

          <p className="text-sm text-gray-500">
            Hospital ERP - Pharmacy Module
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
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
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={sales}
          pagination={pagination}
          totalCount={totalCount}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          loading={loading}
          tableTitle="Sales Table"
        />
      </div>

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}

      {/* ================= PRINT STYLE ================= */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            .print-area,
            .print-area * {
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