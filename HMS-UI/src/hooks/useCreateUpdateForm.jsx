import { useState } from "react";
import { toast } from "react-toastify";

const useCreatUpdateForm = (ApiService) => {
  /* ---------------- UI STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  /* ---------------- CREATE ---------------- */
  const createRecord = async (data) => {
    try {
      setLoading(true);
      setError(null);

      await ApiService.create(data);
      toast.success("Create Successfully");
      return true;
    } catch (err) {
      const message = err?.response?.data?.message || "Create failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
      console.log("Finaly");
    }
  };

  const updateRecord = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      await ApiService.update(id, data);
      toast.info("Update Successfull");
      return true;
    } catch (err) {
      const message = err?.response?.data?.message || "Update failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await ApiService.delete(id);
      toast.success("Delete Successfully!!!");
      return true;
    } catch (err) {
      const message = err?.response?.data?.message || "Delete failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () =>{
    setEditing(null);
    setOpenModal(true);

  };

  const openEdit = (row)=>{
    setEditing(row);
    setOpenModal(true);
  }

  const closeModal = ()=>{
    setOpenModal(false);
    setEditing(null);
  }

  const refersh = ()=>{
    setRefreshKey((p) => p + 1);
  }


  const handleSubmit = async (data)=>{
    let success = false;

    if(editing){
      success = await updateRecord(editing.id, data);

    }else{
      success = await createRecord(data);
    }
    if (success){
      closeModal();
      refersh();
    }
  }

  const handleDelete = async (id)=>{
    
     const ok = window.confirm("Are you sure?");
     if (!ok) return;

    const success = await deleteRecord(id);
    if (success) refersh();
  }

  const defaultAction = [
    {
      label: "Edit",
      icon: "✏️",
      className: "text-blue-500",
      onClick: openEdit
    },
    {
      label: "Delete",
      icon: "🗑",
      danger: true,
      onClick:(row)=> handleDelete(row.id),
    },
  ];

  return { 
    // API State
     loading, 
    error,

    // UI State
    openModal,
    editing,
    refreshKey,

    // ACTION
    openCreate,
    openEdit,
    closeModal,
    handleSubmit,
    handleDelete,
    defaultAction,
    refersh, 
    
  };
};

export default useCreatUpdateForm;
