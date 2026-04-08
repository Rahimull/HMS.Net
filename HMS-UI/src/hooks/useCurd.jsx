import { useEffect, useState } from "react";

const useCrud = (service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get All
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await service.getAll();
      console.log("API Response:", res);

      // فقط آرایه اصلی
      setData(res.data.data);
      setError(null);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Create
  const createItem = async (item) => {
    try {
      setLoading(true);
      await service.create(item);
      await fetchData();
    } catch (err) {
      console.error(err);
      setError("Create failed");
    } finally {
      setLoading(false);
    }
  };

  // Update
  const updateItem = async (id, item) => {
    try {
      setLoading(true);
      await service.update(id, item);
      await fetchData();
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const deleteItem = async (id) => {
    if (window.confirm("Are you Sure...?")) {
      try {
        setLoading(true);
        await service.delete(id);
        await fetchData();
      } catch (err) {
        console.error(err);
        setError("Delete failed");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useCrud;