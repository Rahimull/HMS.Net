import TestFrom from "../form/testForm";
import Modal from "./Modal";



const CrudFormModal = ({
    open,
    onClose,
    title,
    fields,
    initialValues,
    onSubmit,
    loading,
    submitText,
})=>{
return(
    <Modal open={open} onClose={onClose} title={title}>
        <TestFrom 
            fields={fields}
            initialValues={initialValues}
            onSubmit={onSubmit}
            loading={loading}
            submitText={submitText}
        />

    </Modal>
);

}

export default CrudFormModal;