import CrudFormModal from "@/components/modal/CrudFormModal";




const CreateUpdateCategory = ({curd})=>{


    return(
        <>
        <CrudFormModal 
        open={curd.openModal}
        onClose={curd.closeModal}
        title={curd.editing ? "Edit Category" : "Add Category"}
        onSubmit={curd.handleSubmit}
        loading={curd.loading}
        submitText={curd.editing ? "Update Category" : "Add Category"}
        initialValues={curd.editing}
        fields={[
              {
                name: "name",
                label: "Name [*,  🔑]",
                placeholder: "Enter Category",
                type: "text",
                maxLength: 100,
                required: true,
              },
            ]}
      />
        </>
    );
}


export default CreateUpdateCategory;