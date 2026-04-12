import { useCallback, useEffect, useState } from "react";

const useCrud = (service, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await service.getPaged({
        pagination,
        sorting,
        search: { term: search },
      });

      const result = res.data.data;

      setData(result.data || []);
      setTotalCount(result.totalCount || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [service, pagination, sorting, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    loading,
    error,
  };
};

export default useCrud;