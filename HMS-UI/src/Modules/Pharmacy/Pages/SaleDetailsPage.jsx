import { useEffect, useMemo, useState } from "react";
import SaleApi from "@/api/pharmacy/SaleApi";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import FilterCard from "@/components/filter/FilterCard";
import Label from "@/components/common/Label";

/* ================= STATUS ================= */
const getStatus = (isPaid) =>
  isPaid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700";

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
        cell: ({ row }) => {
          return row.original.doctorName ? row.doctorName : "No Doctor";
        },
      },
      {
        accessorKey: "patientName",
        header: "Patient",
        cell: ({ row }) => {
          return row.original.patientName
            ? row.patientName
            : "Walk-in-customer";
        },
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
            <span>{new Date(row.original.saleDate).toLocaleString()}</span>
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
                isPaid,
              )}`}
            >
              {isPaid ? "Paid" : "Unpaid"}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= Filter ================= */}

      <FilterCard
        title="Sales Filters"
        subtitle="Filter Pharmacy Sales"
        onApply={() => console.log("Apply")}
        onReset={() => console.log("Reset")}
      >
        <div>
          <Label name="search" />
          <Input
            type="text"
            placeholder="Invoice / Patient"
            className="border-white/40"
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
          />
        </div>
        <div>
          <Label name="Status" />
          <Input
            className="border-white/40"
            value={statusFilter}
            onChange={(e)=> setStatusFilter(e.target.value)}
            type="select"
            options={[
              { label: "All", value: "all" },
              { label: "Paid", value: "paid" },
              { label: "Unpaid", value: "unpaid" },
            ]}
          />
        </div>
        <div>
          <Label name="from date" />
          <Input type="date" className="border-white/40" />
        </div>
        <div>
          <Label name="to date" />
          <Input type="date" className="border-white/40" />
        </div>
      </FilterCard>

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
