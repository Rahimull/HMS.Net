import { useEffect, useMemo, useState } from "react";

import ItemStockApi from "@/api/store/ItemStockApi";

import KPI from "../component/KPI";

import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";

export default function ItemStockPage() {

  const [itemStocks, setItemStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {

      const res = await ItemStockApi.getPaged({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sorting?.sortBy,
        sortDir: sorting?.sortDir,
      });

      const data = res.data.data.data ?? res.data.data ?? [];

      setItemStocks(Array.isArray(data) ? data : []);

      setTotalCount(res.data.data.totalCount ?? data.length);

    } catch (err) {

      setToast({
        message: "Failed to load batch inventory",
        type: "error",
      });

    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadData();
  }, [pagination, sorting]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {

    return itemStocks.filter((x) =>
      x.itemName?.toLowerCase().includes(search.toLowerCase()) ||
      x.batchNo?.toLowerCase().includes(search.toLowerCase())
    );

  }, [itemStocks, search]);

  /* ================= KPI ================= */

  const expiredCount = useMemo(() => {

    const today = new Date();

    return itemStocks.filter(
      (x) => new Date(x.expiryDate) < today
    ).length;

  }, [itemStocks]);

  const lowCount = useMemo(() => {

    return itemStocks.filter(
      (x) => x.quantity < (x.minLevel ?? 10)
    ).length;

  }, [itemStocks]);

  const nearExpiry = useMemo(() => {

    const today = new Date();

    const next30 = new Date();

    next30.setDate(today.getDate() + 30);

    return itemStocks.filter((x) => {

      const expiry = new Date(x.expiryDate);

      return expiry >= today && expiry <= next30;

    }).length;

  }, [itemStocks]);

  /* ================= STATUS ================= */

  const getStatus = (row) => {

    const today = new Date();

    const expiry = new Date(row.expiryDate);

    if (row.quantity === 0) {

      return {
        label: "OUT",
        className: "bg-red-100 text-red-700",
      };

    }

    if (expiry < today) {

      return {
        label: "EXPIRED",
        className: "bg-red-200 text-red-800",
      };

    }

    if (row.quantity < (row.minLevel ?? 10)) {

      return {
        label: "LOW",
        className: "bg-yellow-100 text-yellow-700",
      };

    }

    return {
      label: "GOOD",
      className: "bg-green-100 text-green-700",
    };

  };

  /* ================= TABLE COLUMNS ================= */

  const columns = useMemo(() => [

    {
      accessorKey: "itemName",
      header: "Item",
    },

    {
      accessorKey: "batchNo",
      header: "Batch No",
    },

    {
      accessorKey: "quantity",
      header: "Qty",
    },

    {
      accessorKey: "purchasePrice",
      header: "Purchase",
    },

    {
      accessorKey: "salePrice",
      header: "Sale",
    },

    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) =>
        row.original.expiryDate
          ? new Date(row.original.expiryDate).toLocaleDateString()
          : "-",
    },

    {
      header: "Status",

      cell: ({ row }) => {

        const status = getStatus(row.original);

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-bold ${status.className}`}
          >
            {status.label}
          </span>
        );
      },
    },

  ], []);

  /* ================= ACTIONS ================= */

  const viewMovement = (row) => {
    console.log("Movement", row);
  };

  const editBatch = (row) => {
    console.log("Edit", row);
  };

  return (

    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-2xl font-bold">
          ItemStock Management
        </h1>

        <p className="text-gray-500">
          Batch Inventory Management
        </p>

      </div>

      {/* ================= KPI ================= */}

      <div className="grid md:grid-cols-4 gap-4">

        <KPI
          title="Total Batches"
          value={itemStocks.length}
          color="from-blue-500 to-blue-700"
        />

        <KPI
          title="Expired"
          value={expiredCount}
          color="from-red-500 to-red-700"
        />

        <KPI
          title="Low Stock"
          value={lowCount}
          color="from-yellow-500 to-yellow-700"
        />

        <KPI
          title="Near Expiry"
          value={nearExpiry}
          color="from-orange-500 to-orange-700"
        />

      </div>

      {/* ================= SEARCH ================= */}

      <div>

        <Input
          placeholder="Search item or batch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* ================= TABLE ================= */}

      <DataTable
        columns={columns}
        data={filtered}
        pagination={pagination}
        totalCount={totalCount}
        loading={false}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Batch Inventory"

        actions={(row) => (

          <div className="flex gap-2">

            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => viewMovement(row)}
            >
              Movement
            </Button>

            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => editBatch(row)}
            >
              Edit
            </Button>

          </div>

        )}
      />

      {/* ================= TOAST ================= */}

      {toast && (

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />

      )}

    </div>
  );
}