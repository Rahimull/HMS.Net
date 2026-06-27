import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import RowActions from "../rowAction/RowAction";
import Pagination from "../pagination/Pagination";
import Button from "./Button";
import { Plus } from "lucide-react";

const DataTable = ({
  columns,
  data,
  pagination,
  totalCount,
  onPaginationChange,
  onSortingChange,
  loading,
  title = "Table",
  subTitle = "subTitle",
  headerContent = "",
  actions,
  onAddBtn = "",
  onAddBtnText="",
}) => {
  const [tableSorting, setTableSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: tableSorting,
      pagination,
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange,
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(tableSorting) : updater;

      setTableSorting(next);

      const sort = next[0];
      onSortingChange?.(
        sort
          ? {
              sortBy: sort.id,
              sortDir: sort.desc ? "desc" : "asc",
            }
          : null,
      );
    },

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-4">
      {/* TABLE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b bg-gray-50">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">{subTitle}</p>
          </div>

          {onAddBtn && (
            <Button onClick={onAddBtn} rightIcon={<Plus size={16} />}>
              {onAddBtnText}
            </Button>
          )}
        </div>

        {/* CENTER */}
        {headerContent && (
          <div className="flex items-center gap-3">{headerContent}</div>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Total:
            <span className="ml-1 font-semibold text-gray-800">
              {totalCount}
            </span>
          </span>

          <Button variant="secondary">Export</Button>
        </div>
      </div>

      {/* TABLE  Body*/}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* TABLE HEADER */}
          <thead className="bg-gray-50 border-b border-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getIsSorted() === "asc" && " ▲"}
                      {h.column.getIsSorted() === "desc" && " ▼"}
                    </div>
                  </th>
                ))}
                {actions?.length > 0 && (
                  <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                )}
              </tr>
            ))}
          </thead>

          {/* TBODY */}
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td
                    colSpan={columns.length + (actions?.length > 0 ? 1 : 0)}
                    className="p-4"
                  >
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions?.length > 0 ? 1 : 0)}
                  className="text-center p-6 text-gray-400"
                >
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${cell.column.id == "id" ? "font-medium text-gray-900" : "text-sm text-gray-700"} px-4 py-2`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}

                  {/* ACTIONS */}

                  {actions?.length > 0 && (
                    <td className="px-4 py-2 flex justify-center">
                      <RowActions row={row.original} actions={actions} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && onPaginationChange && (
        <Pagination
          pagination={pagination}
          totalCount={totalCount}
          onPaginationChange={onPaginationChange}
        />
      )}
    </div>
  );
};

export default DataTable;
