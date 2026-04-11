// const DataTable = ({ columns, data, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white p-4 rounded shadow mt-6">
//       <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
//       <table className="w-full text-left">
//         <thead>
//           <tr className="border-b">
//             {columns.map((col) => (
//               <th key={col.key} className="p-2">
//                 {col.label}
//               </th>
//             ))}
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row) => (
//             <tr className="border-b hover:bg-gray-100" key={row.id}>
//               {columns.map((col) => (
//                 <td key={col.key} className="p-2">
//                   {row[col.key]}
//                 </td>
//               ))}
//               <td className="p-2 text-green-600">
//                 <button
//                   onClick={() => onEdit(row)}
//                   className="font-semibold mr-2 cursor-pointer hover:text-green-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(row.id)}
//                   className="font-semibold text-red-500 cursor-pointer hover:text-red-950"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DataTable = ({
  columns,
  data,
  pagination,
  totalCount,
  onPaginationChange,
  onEdit,
  onDelete,
  loading,
}) => {
  // ✅ SAFE VALUES
  const pageSize = pagination?.pageSize || 10;
  const pageIndex = pagination?.pageIndex || 0;
  const safeTotal = Number.isFinite(totalCount) ? totalCount : 0;
  const pageCount = Math.max(1, Math.ceil(safeTotal / pageSize));

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: { pageIndex, pageSize },
    },
    pageCount,
    manualPagination: true,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Departments</h2>

      {/* TABLE */}
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="p-2">Actions</th>
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-4 text-center"
              >
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-4 text-center"
              >
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
                <td className="p-2">
                  <button
                    onClick={() => onEdit(row.original)}
                    className="mr-2 text-green-600 hover:text-green-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row.original.id)}
                    className="text-red-500 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">
          Page {pageIndex + 1} of {pageCount}
        </span>

        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;



