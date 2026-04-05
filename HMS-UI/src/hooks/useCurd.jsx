import { useEffect, useState } from "react";

const useCrud = (service) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await service.getAll();
    setData(res.data);
  };

  const createItem = async (item) => {
    await service.create(item);
    fetchData();
  };

  const updateItem = async (id, item) => {
    await service.update(id, item);
    fetchData();
  };

  const deleteItem = async (id) => {
    await service.remove(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, createItem, updateItem, deleteItem };
};

export default useCrud;