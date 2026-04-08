import { useEffect, useState } from "react";

const useCrud = (service) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await service.getAll();
      console.log("API Response:", res);
      setData(res.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const createItem = async (item) => {
    console.log("Item created:", item);
    await service.create(item);

    fetchData();
  };

  const updateItem = async (id, item) => {
    await service.update(id, item);
    fetchData();
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you Sure...!")) {
      console.log("remove");
      await service.delete(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, createItem, updateItem, deleteItem };
};

export default useCrud;
