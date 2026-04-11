import { useState, useEffect } from "react";
import ScheduleApi from "../services/SchedulesApi";
import useCrud from "../../../hooks/useCurd";
import DataTable from "../../../components/common/DataTable";
import Layout from "../../../components/layout/Layout";
import ReusableForm from "../../../components/form/ResusableForm";
import Loader from "../../../components/common/Loader";
import doctorApi from "../../../api/DoctorsModules/DoctorApi"

const SchedulePage = () => {
  const { data, loading, error, createItem, updateItem, deleteItem } =
    useCrud(ScheduleApi);

  const [editing, setEditing] = useState(null);
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await patientApi.getAll();
        const doctorRes = await doctorApi.getAll();

        setPatient(patientRes.data.data);
        setDoctor(doctorRes.data.data);
      } catch (error) {
        console.log("API Error:", error);
      }
    };

    fetchData();
  }, []);

  const patientOptions = patient.map((d) => ({
    value: d.id,
    label: `${d.firstName} -- ${d.lastName}`,
  }));

  const doctorOptions = doctor.map((d) => ({
    value: d.id,
    label: `${d.firstName} -- ${d.lastName}`,
  }));

  // {
  //   "visitDate": "2026-04-10T16:52:46.291Z",
  //   "chiefComplaint": "asdf;alkjsd;la",
  //   "notes": "ajs;dfkasl",
  //   "examination": "ajsdl;fasdk",
  //   "doctorId": 2,
  //   "patientId": 3
  // }

  // Submit (create / update)
  const handleSubmit = (formData) => {
    const payload = {
      visitDate: formData.visitDate,
      chiefComplaint: formData.chiefComplaint,
      notes: formData.notes,
      examination: formData.examination,
      doctorId: Number(formData.doctorId),
      patientId: Number(formData.patientId),
    };

    if (editing) {
      updateItem(editing.id, payload);
      setEditing(null);
    } else {
      createItem(payload);
    }
  };

  // From Fields
  const ScheduleFields = [
    {
      name: "visitDate",
      label: "Visit Date",
      type: "date",
      required: true,
    },
    {
      name: "chiefComplaint",
      label: "Chief Complaint",
      type: "text",
      required: true,
    },
    {
      name: "patientId",
      label: "Patient",
      type: "select",
      options: patientOptions,
    },
    { name: "examination", label: "Examination", type: "Text", required: true },
    {
      name: "doctorId",
      label: "Doctor",
      type: "select",
      options: doctorOptions,
    },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  // Table Columns
  const ScheduleColumns = [
    { key: "id", label: "ID" },
    { key: "visitDate", label: "Visit Date" },
    { key: "chiefComplaint", label: "Chief Complaint" },
    { key: "notes", label: "Notes" },
    { key: "examination", label: "Examination" },
    { key: "doctorId", label: "Doctor Name" },
    { key: "patientId", label: "Patient Name" },
  ];

  return (
    <Layout>
      {/* Form */}
      <ReusableForm
        fields={ScheduleFields}
        initialValues={editing}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Schedule" : "Register Schedule"}
      />

      {/* Errors */}
      {error && <p style={{ color: "red" }}> {error}</p>}

      {/* Loader or Table */}
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={ScheduleColumns}
          data={data}
          onEdit={setEditing}
          onDelete={deleteItem}
        />
      )}
    </Layout>
  );
};

export default SchedulePage;
