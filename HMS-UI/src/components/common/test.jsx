import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "@/components/common/Card";
import { useState } from "react";

const DataTable = ({
  columns,
  data,
  pagination,
  totalCount,
  onPaginationChange,
  onSortingChange,
  loading,
  tableTitle = "Table",
  actions,
}) => {
  const pageSize = pagination.pageSize;
  const pageIndex = pagination.pageIndex;

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const maxPageIndex = pageCount - 1;

  const [tableSorting, setTableSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting: tableSorting, pagination },
    manualPagination: true,
    manualSorting: true,
    pageCount,
    onPaginationChange,
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(tableSorting) : updater;

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
    <Card className="p-4 rounded-2xl shadow-md bg-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {tableTitle}
        </h2>

        <span className="text-sm text-gray-400">
          Total: {totalCount}
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">

          {/* THEAD */}
          <thead className="bg-gray-100 text-gray-600">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="p-3 text-left cursor-pointer select-none"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        h.column.columnDef.header,
                        h.getContext()
                      )}
                      {h.column.getIsSorted() === "asc" && "▲"}
                      {h.column.getIsSorted() === "desc" && "▼"}
                    </div>
                  </th>
                ))}
                <th className="p-3">Actions</th>
              </tr>
            ))}
          </thead>

          {/* TBODY */}
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={columns.length + 1} className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center p-6 text-gray-400"
                >
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b transition ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      {actions ? (
                        actions(row.original)
                      ) : (
                        <>
                          <button className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200">
                            Edit
                          </button>
                          <button className="px-2 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-200">
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">

        <span className="text-sm text-gray-500">
          Page {pageIndex + 1} of {pageCount}
        </span>

        <div className="flex gap-2">
          <button
            disabled={pageIndex <= 0}
            onClick={() =>
              onPaginationChange((p) => ({
                ...p,
                pageIndex: Math.max(0, p.pageIndex - 1),
              }))
            }
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-40"
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
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

    </Card>
  );
};

export default DataTable;