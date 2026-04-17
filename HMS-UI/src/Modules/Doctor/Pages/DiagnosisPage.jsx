import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import DiagnosisApi from "../../../api/doctor/DiagnosisApi";
import { useEffect, useState } from "react";
import ConsultationApi from "@/api/doctor/ConsultationApi";

const DiagnosisPage = () => {
  const [consultations, setConsultations] = useState([])
  useEffect(()=>{
    ConsultationApi.getPaged({page:1, pageSize:1000})
      .then(res => setConsultations(res.data.data.data))

    DiagnosisApi.getPaged({page:1, pageSize:100})
      .then(res => console.log(res.data.data.data))
  }, [])

  const consultationOption = consultations.map(c => ({
    label: c.id,
    vlaue:c.id
  }))

  return (
    <BaseCrudPage
      title="Diagnosiss"
      service={DiagnosisApi}
      fields={[
        {
          name: "diagnosisName",
          label: "Diagnosis Name",
          type: "text",
          required: true,
        },
        { name: "diagnosisDetails", label: "Diagnosis Details", type: "text" },
        { name: "diagnosisDate", label: "Date and Time", type: "datetime-local" },
        {
          name: "consultationId",
          label: "Consultaion",
          type: "select",
          options: consultationOption,
        },
      ]}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "diagnosisName", header: "Diagnosis" },
        { accessorKey: "diagnosisDetails", header: "Diagnosis Details" },
        { accessorKey: "consultationName", header: "Consultation" },
        { accessorKey: "diagnosisDate", header: "Date" },
        ,
      ]}
      mapFormToPayload={(formData) => ({
        diagnosisName: formData.diagnosisName,
        diagnosisDetails: formData.diagnosisDetails,
        diagnosisDate: formData.diagnosisDate,
        consultationId: Number(formData.consultationId),
      })}
    />
  );
};

export default DiagnosisPage;
