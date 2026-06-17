import { useEffect, useMemo, useState } from "react";
import StockMovementApi from "@/api/store/StockMovementApi";

import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import DataTable from "@/components/common/DataTable";
import Toast from "@/components/common/Toast";
import Button from "@/components/common/Button";
import Drawer from "@/components/common/Drawer";
import ExportButtons from "@/components/export/ExportButtons";
import { useSearchParams } from "react-router-dom";

export default function StockMovementPage() {
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [kpi, setKpi] = useState({
    totalIn: 0,
    totalOut: 0,
    netMovement: 0,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  


  /* ================= LOAD NAVIGATION ================= */
  const batchNumber = searchParams.get("batchNumber");
  useEffect(() => {
    if (batchNumber) {
      setSearch(batchNumber);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } 
  }, [batchNumber]);


  /* ================= LOAD KPI ================= */
  const loadKpi = async () => {
    try {
      const res = await StockMovementApi.getKpi();
      setKpi(res.data);
    } catch (err) {
      setToast({
        message: "Failed to load KPI data",
        type: "error",
      });
    }
  };
  useEffect(() => {
    loadKpi();
  }, []);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await StockMovementApi.getPaged({
        pagination: {
          pageIndex: pagination.pageIndex ?? 0,
          pageSize: pagination.pageSize || 10,
        },

        sorting: sorting
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

      const Pagedata = res.data.data;
      const data = Pagedata.data ?? [];

      setMovements(Array.isArray(data) ? data : []);
      setTotalCount(Pagedata.totalCount ?? 0);
    } catch (err) {
      setToast({
        message: "Failed to load movements",
        type: "error",
      });
    }finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    const delay = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(delay); // Debounce by 500ms
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  /* ================= ACTIONS ================= */

  const openDetails = (row) => {
    setSelectedMovement(row);
  };


  /* ================= COLUMNS ================= */

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "itemName",
        header: "Item",
      },

      {
        accessorKey: "batchNumber",
        header: "Batch",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
            {row.original.batchNumber}
          </span>
        ),
      },

      {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => (
          <span
            className={`font-bold ${
              row.original.quantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {row.original.quantity > 0 ? "+" : ""}
            {row.original.quantity}
          </span>
        ),
      },

      {
        accessorKey: "unitPrice",
        header: "Unit Price",
        cell: ({ row }) => (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            {row.original.unitPrice?.toLocaleString()} AFG
          </span>
        ),
      },

      {
        header: "Total",
        cell: ({ row }) => {
          const total =
            Math.abs(row.original.quantity || 0) * (row.original.unitPrice || 0);

          return (
            <span className="font-semibold">{total.toLocaleString()} AFG</span>
          );
        },
      },

      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;

          const style =
            type === "Sale"
              ? "bg-red-100 text-red-700"
              : type === "Purchase"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700";

          return (
            <span className={`px-2 py-1 rounded text-xs font-bold ${style}`}>
              {type}
            </span>
          );
        },
      },

      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) =>
          row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleString()
            : "-",
      },
    ],
    [],
  );



  // ACTIONS
  const actions = useMemo(()=>[
    {
      label: "View",
      icon: "👁",
      className:"text-blue-500",
      onClick: (row)=> openDetails(row),
    }
  ],[openDetails]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl font-bold">Stock Movement History</h1>

        <p className="text-gray-500">Audit & Tracking Center</p>
      </div>

      {/* ================= KPI ================= */}

      <div className="grid md:grid-cols-3 gap-4">
        <KPI
          title="In Movements"
          value={kpi.totalIn}
          color="from-green-500 to-green-700"
        />

        <KPI
          title="Out Movements"
          value={kpi.totalOut}
          color="from-red-500 to-red-700"
        />

        <KPI
          title="Total Movements"
          value={kpi.netMovement}
          color="from-blue-500 to-blue-700"
        />
      </div>

      {/* ================= FILTER ================= */}

      <div className="flex gap-3">
        <Input
          placeholder="Search item or type..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination((prev)=>({
              ...prev, pageIndex: 0
            }));
          }

          }
        />

        <ExportButtons 
          data={movements}
          fileName="stock-movements"
          pdfColumns={["Item", "Batch", "Quantity", "Type"]}
          pdfRows={movements.map((x)=> [x.itemName, x.batchNumber,x.quantity,x.type])}
          >
        </ExportButtons>
      </div>

      {/* ================= TABLE ================= */}

      <DataTable
        columns={columns}
        data={movements}
        pagination={pagination}
        totalCount={totalCount}
        loading={loading}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        tableTitle="Stock Movements"
        actions={actions}
      />

      {/* ================= DRAWER ================= */}

      {selectedMovement && (
        <Drawer
          isOpen={!!selectedMovement}
          onClose={() => setSelectedMovement(null)}
          title="Movement Details"
          subtitle="Audit Information"
        >
          {/* CONTENT */}
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500">Item</p>
              <p className="font-semibold">{selectedMovement?.itemName}</p>
            </div>

            <div>
              <p className="text-gray-500">Batch Number</p>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                {selectedMovement?.batchNumber}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Quantity</p>
              <p
                className={`font-bold ${
                  selectedMovement?.quantity > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedMovement?.quantity > 0 ? "+" : ""}
                {selectedMovement?.quantity}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Unit Price</p>
              <p className="font-semibold">
                {selectedMovement?.unitPrice?.toLocaleString()} AFG
              </p>
            </div>
            <div>
              <p className="text-gray-500">Movement Type</p>
              <p className="font-semibold">
                {selectedMovement?.type}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Reference</p>
              <p className="font-semibold">
                {selectedMovement?.referenceType || "-"} #
                {selectedMovement?.referenceId || "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-semibold">
                {selectedMovement?.createdAt
                  ? new Date(selectedMovement.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>  
            <div>
              <p className="text-gray-500">Notes</p>
              <p className="font-semibold">
                {selectedMovement.notes || "No notes"}
              </p>
            </div>  
              
          </div>
        </Drawer>
      )}

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
