import { useState, useEffect } from "react";
import DiagnosisApi from "../services/DiagnosisApi";
import consultationApi from "../services/ConsultationApi"
import useCrud from "../../../hooks/useCurd";
import DataTable from "../../../components/common/DataTable";
import Layout from "../../../components/layout/Layout";
import ReusableForm from "../../../components/form/ResusableForm";
import Loader from "../../../components/common/Loader";

const DiagnosisPage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(DiagnosisApi);

  const [editing, setEditing] = useState(null);
  const [consultation, setconsultation] = useState([]);

  useEffect(() => {
    consultationApi.getAll().then((res) => {
      setconsultation(res.data.data);
    });
  }, []);

  const consultationOptions = consultation.map((d) => ({
    value: d.id,
    label: `${d.visitDate}`
  }));

  // Submit (create / update)
  const handleSubmit = (formData) => {
    const payload = {
      diagnosisName: formData.diagnosisName,
      diagnosisDetails: formData.diagnosisDetails,
      diagnosisDate: formData.diagnosisDate,
      consultationId: Number(formData.consultationId),
    };
    console.log(payload)

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };

  //  {
  //     "id": 1,
  //     "diagnosisName": "hplry",
  //     "diagnosisDetails": "asdfs",
  //     "diagnosisDate": "2026-04-10T17:31:58.084",
  //     "consultationId": 1
  //   }

  // From Fields
  const DiagnosisFields = [
    {name: "diagnosisName",label: "Diagnosis Name",type: "text",required: true},
    { name: "diagnosisDetails", label: "Diagnosis Details", type: "text" },
    {name: "diagnosisDate",label: "Date",type: "date"},
    {name: "consultationId",label: "Consultaion",type: "select",
      options: consultationOptions,
    },
  ];

  // Table Columns
  const DiagnosisColumns = [
    { key: "id", label: "ID" },
    { key: "diagnosisName", label: "Diagnosis" },
    { key: "diagnosisDetails", label: "Diagnosis Details" },
    { key: "consultationId", label: "Consultation" },
    { key: "diagnosisDate", label: "Date" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={DiagnosisFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Diagnosis" : "Register Diagnosis"}
      />

      {/* Errors */}
      {error && <p style={{ color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={DiagnosisColumns}
          data={data}
          onEdit={setEditing}
          onDelete={deleteItem}
        />
      )}
    </Layout>
  );
};

export default DiagnosisPage;
