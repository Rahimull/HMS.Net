import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

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
  const debouncedSearch = useDebounce(search, 300);

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = useCallback(async () => {
    console.log(
      "FETCH",
      "pageIndex:",
      pagination.pageIndex,
      "pageSize:",
      pagination.pageSize,
      "search:",
      debouncedSearch,
    );
    try {
      setLoading(true);
      setError(null);

      const res = await service.getPaged({
        pagination,
        sorting: sorting
          ? {
              sortBy: sorting.sortBy,
              isDescending: sorting.sortDir === "desc",
            }
          : null,
        search: { searchTerm: debouncedSearch },
      });

      const result = res.data.data;
      setData(result.data || []);
      setTotalCount(result.totalCount || 0);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [service, pagination, sorting, debouncedSearch]);

  // هر بار pagination / sorting / search عوض شود → fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // وقتی سرچ تغییر کرد → برگرد صفحه اول
  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [debouncedSearch]);

  /* ---------------- CREATE ---------------- */
  const createItem = async (item) => {
    try {
      setLoading(true);
      setError(null);

      await service.create(item);

      // فقط state را تغییر بده، fetch خودش انجام می‌شود
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE ---------------- */
  const updateItem = async (id, item) => {
    try {
      setLoading(true);
      setError(null);

      await service.update(id, item);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoading(true);
      setError(null);

      await service.delete(id);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(
    "FETCH CALLED WITH:",
    pagination.pageIndex,
    pagination.pageSize,
    debouncedSearch,
  );

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
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useCrud;
