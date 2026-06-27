import { useState } from "react";
import { toast } from "react-toastify";

const useCreatUpdateForm = (ApiService) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  


  /* ---------------- CREATE ---------------- */

  const createRecord = async(data)=>{
     try {
      setLoading(true);
      setError(null);

      await ApiService.create(data);
      toast.success("Create Successfully");
      return true;
    } catch (err) {
       console.log("ERROR:", err);
      console.log("RESPONSE:", err?.response);
      console.log("DATA:", err?.response?.data);
      console.log("STATUS:", err?.response?.status);
      const message = err?.response?.data?.message || "Create failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    console.log("Finaly")
    }

  }

  const updateRecord = async(id, data)=>{
    try{
      setLoading(true)
      setError(null);
      await ApiService.update(id, data);
      toast.info("Update Successfull");
      return true;
    }catch (err) {
      const message = err?.response?.data?.message || "Update failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async(id)=>{
    if (!window.confirm("Are you sure ??? ")) return;

    try{
      setLoading(true)
      setError(null);
      await ApiService.delete(id);
      toast.error("Delete Successfully!!!");
      return true;
    }catch (err) {
      const message = err?.response?.data?.message || "Delete failed";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
  };
}
 
   return {createRecord,updateRecord,deleteRecord, loading, error};



};


export default useCreatUpdateForm;
