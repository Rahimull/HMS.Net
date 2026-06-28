import CrudFormModal from "@/components/modal/CrudFormModal";




const CreateUpdateSupplier = ({curd})=>{

    const fields =[
      {
        name: "name",
        label: "Name [*,  🔑]",
        type: "text",
        required: true,
        maxLength: 100,
        placeholder:"Suppliers Name"
      },
      {
        name: "contactInfo",
        label: "Contact Information *",
        type: "text",
        placeholder: "Phone / Email",
        maxLength: 50,
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
      },
    ];

    return(
        <>
        <CrudFormModal 
        open={curd.openModal}
        onClose={curd.closeModal}
        title={curd.editing ? "Edit Supplier" : "Add Supplier"}
        onSubmit={curd.handleSubmit}
        loading={curd.loading}
        submitText={curd.editing ? "Update Supplier" : "Add Supplier"}
        initialValues={curd.editing}
        fields={fields}
      />
        </>
    );
}


export default CreateUpdateSupplier;