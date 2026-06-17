import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import RowActions from "../rowAction/RowAction";
import Pagination from "../pagination/Pagination";

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
  headerContent="",
  actions,
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
      {/* <div className="flex items-center justify-between p-5 border-b border-gray-100 border">
        <div className="border">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subTitle}</p>
        </div>

        <div className="border flex flex-1 p-2 m-2">
          <div>
            <span>Total Amount:</span>
          <span>1000000</span>
          </div>
          <div>
            <span>Total Amount:</span>
          <span>1000000</span>
          </div>
        </div>

        <div className="flex flex-col border">
          <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-all">
            Export
          </button>
          <span className="px-3 py-1 text-sm text-gray-400">
            Total: {totalCount}
          </span>
        </div>
      </div> */}

      {/* TABLE HEADER */}
<div className="flex items-center justify-between p-5 bg-white border-b">

  {/* LEFT */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800">
      {title}
    </h2>

    <p className="text-sm text-gray-500">
      {subTitle}
    </p>
  </div>

  {/* CENTER KPI */}

<div className="flex items-center gap-4">
      {headerContent}

</div>

  {/* RIGHT */}
  <div className="flex flex-col items-end gap-2">

    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
      Export
    </button>

    <span className="text-xs text-gray-400">
      Records: {totalCount}
    </span>

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
                  <td colSpan={columns.length + (actions?.length > 0 ? 1 : 0)} className="p-4">
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
