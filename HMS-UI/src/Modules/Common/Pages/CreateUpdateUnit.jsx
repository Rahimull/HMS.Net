import CrudFormModal from "@/components/modal/CrudFormModal";




const CreateUpdateUnit = ({curd})=>{


    return(
        <>
        <CrudFormModal 
        open={curd.openModal}
        onClose={curd.closeModal}
        title={curd.editing ? "Edit Unit" : "Add Unit"}
        onSubmit={curd.handleSubmit}
        loading={curd.loading}
        submitText={curd.editing ? "Update Unit" : "Add Unit"}
        initialValues={curd.editing}
        fields={[
              {
                name: "name",
                label: "Name [*,  🔑]",
                placeholder: "Enter Unit",
                type: "text",
                maxLength: 100,
                required: true,
              },
            ]}
      />
        </>
    );
}


export default CreateUpdateUnit;