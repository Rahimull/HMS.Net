import SaleApi from "@/api/pharmacy/SaleApi";
import CrudFormModal from "@/components/modal/CrudFormModal";
import { useEffect, useState } from "react";




const CreateUpdateSalePayment = ({curd})=>{
  const [sale, setSale] = useState([]);

  useEffect(()=>{
    SaleApi.getPaged(
      {pagination:{
        pageSize:1000,
        pageIndex: 0
      }}).then((res)=> setSale(res.data.data.data),);
      
  },[]);

  

  const saleOption = sale.map((s)=>(
    {
      label: s.invoiceNumber,
      value: s.id
    }
    
  ));

 console.log(sale)



    const fields =[
      {
        name: "saleId",
        label: "Pateint *",
        type: "select",
        required: true,
        options:saleOption,
      },
      {
        name: "amount",
        label: "Amount *",
        type: "number",
        placeholder: "Enter Amount",
        maxLength: 100,
        required: true,
      },
      {
        name: "note",
        label: "Note",
        type: "textarea",
      },
    ];

    return(
        <>
        <CrudFormModal 
        open={curd.openModal}
        onClose={curd.closeModal}
        title={curd.editing ? "Edit Sale Payment" : "Add Sale Payment"}
        onSubmit={curd.handleSubmit}
        loading={curd.loading}
        submitText={curd.editing ? "Update Sale Payment" : "Add Sale Payment"}
        initialValues={curd.editing}
        fields={fields}
      />
        </>
    );
}


export default CreateUpdateSalePayment;