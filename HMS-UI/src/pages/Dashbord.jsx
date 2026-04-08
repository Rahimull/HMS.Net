import Layout from "../components/layout/Layout";
import Card from "../components/common/Card";
import ReusableForm from "../components/form/ResusableForm";



const Dashbord = () =>{

    const patientFields = [
    { name: "name", label: "Patient Name", type: "text", required: true },
    { name: "age", label: "Age", type: "number", required: true },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      required: true,
    },
    { name: "address", label: "Address", type: "textarea" },
  ];

  const handlePatientSubmit = (data) => {
    console.log("Patient Form Data:", data);
    // می‌توان اینجا API POST زد
  };
    return (
        <Layout>
            <h1>Dashbord</h1>
            <Card />
          <Table />
          <ReusableForm
            fields={patientFields}
            onSubmit={handlePatientSubmit}
            submitText="Register Patient"
          />
        </Layout>

        
        
    )
}

export default Dashbord;