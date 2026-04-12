import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

const DataTable = ({
  columns,
  data,
  pagination,
  totalCount,
  onPaginationChange,
  onSortingChange,
  onEdit,
  onDelete,
  loading,
}) => {
  const pageSize = pagination.pageSize;
  const pageIndex = pagination.pageIndex;

  // ✅ تعداد صفحات واقعی از سرور
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const maxPageIndex = pageCount - 1;

  const [tableSorting, setTableSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: tableSorting,
      pagination, // فقط برای sync با header
    },
    manualPagination: true,
    manualSorting: true,
    pageCount,

    onPaginationChange, // کنترل در BaseCrudPage

    onSortingChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(tableSorting)
          : updater;

      setTableSorting(next);

      const sort = next[0];
      onSortingChange(
        sort
          ? {
              sortBy: sort.id,
              sortDir: sort.desc ? "desc" : "asc",
            }
          : null
      );
    },

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="p-2 cursor-pointer select-none"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === "asc" && " ▲"}
                  {h.column.getIsSorted() === "desc" && " ▼"}
                </th>
              ))}
              <th className="p-2">Actions</th>
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border-b">
                {table
                  .getRowModel()
                  .rows.find((r) => r.original.id === row.id)
                  ?.getVisibleCells()
                  .map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                <td className="p-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="mr-2 text-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>

        <div className="space-x-2">
          <button
            disabled={pageIndex <= 0}
            onClick={() =>
              onPaginationChange((p) => ({
                ...p,
                pageIndex: Math.max(0, p.pageIndex - 1),
              }))
            }
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <button
            disabled={pageIndex >= maxPageIndex}
            onClick={() =>
              onPaginationChange((p) => ({
                ...p,
                pageIndex: Math.min(maxPageIndex, p.pageIndex + 1),
              }))
            }
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;