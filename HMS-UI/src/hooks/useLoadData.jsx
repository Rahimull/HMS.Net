import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useLoadData = (apiService, { pageSize = 10, filters = {}, refreshKey = 0 } = {}) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const [sorting, setSorting] = useState({
    sortBy: null,
    sortDir: "asc",
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const payload = {
    pagination,
    sorting: {
      sortBy: sorting.sortBy,
      isDescending: sorting.sortDir === "desc",
    },
    search: {
      searchTerm: debouncedSearch,
    },
    filters,
  };

  const fetchData = useCallback(async () => {
    try {
      setDataLoading(true);
      setError(null);

      const res = await apiService.getPaged({
        pagination,
        sorting: {
          sortBy: sorting.sortBy,
          isDescending: sorting.sortDir === "desc",
        },
        search: { searchTerm: debouncedSearch },
        filters,
      });

      const result = res.data.data;
      setData(result.data || []);
      setTotalCount(result.totalCount || 0);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch data");
    } finally {
      setDataLoading(false);
    }
  }, [apiService, pagination, sorting, debouncedSearch, filters, refreshKey,]);

  // هر بار pagination / sorting / search عوض شود → fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // وقتی که سرچ تغییر کرد برگرد صفحه اول
  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [debouncedSearch]);

  return {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    dataLoading,
    error,
  };
};

export default useLoadData;
