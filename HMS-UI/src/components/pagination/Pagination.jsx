const Pagination = ({
  pagination,
  totalCount,
  onPaginationChange,
}) => {
  const pageSize = pagination.pageSize;
  const pageIndex = pagination.pageIndex;

  const pageCount = Math.max(
    1,
    Math.ceil(totalCount / pageSize)
  );

  const maxPageIndex = pageCount - 1;

  const pages = Array.from(
    { length: pageCount },
    (_, i) => i
  );

  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">

      {/* Page Size */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">
          Rows:
        </label>

        <select
          value={pageSize}
          onChange={(e) =>
            onPaginationChange({
              pageIndex: 0,
              pageSize: Number(e.target.value),
            })
          }
          className="border rounded-lg px-2 py-1 text-sm bg-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Page Numbers */}
      <div className="flex gap-2 items-center">
        <button
          disabled={pageIndex <= 0}
          onClick={() =>
            onPaginationChange((p) => ({
              ...p,
              pageIndex: Math.max(0, p.pageIndex - 1),
            }))
          }
          className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-sm disabled:opacity-40"
        >
          Prev
        </button>

        <div className="flex gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() =>
                onPaginationChange((prev) => ({
                  ...prev,
                  pageIndex: p,
                }))
              }
              className={`min-w-7 min-h-7 px-3 rounded-xl text-sm font-medium ${
                pageIndex === p
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white hover:bg-gray-100"
              }`}
            >
              {p + 1}
            </button>
          ))}
        </div>

        <button
          disabled={pageIndex >= maxPageIndex}
          onClick={() =>
            onPaginationChange((p) => ({
              ...p,
              pageIndex: Math.min(
                maxPageIndex,
                p.pageIndex + 1
              ),
            }))
          }
          className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;