import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ScheduleApi from "../../../api/doctor/ScheduleApi";
import { useEffect, useState } from "react";
import { DoctorApi } from "@/api";

const SchedulePage = () => {

  const [doctors, setDoctors] = useState([]);
  useEffect(()=>{
    DoctorApi.getPaged({page:1, pageSize: 1000}).then(res =>
      setDoctors(res.data.data.data)
    );
  },[]);

  const doctorOptions = doctors.map(d => (
    {
      label: `${d.firstName} - ${d.lastName}`,
      value : d.id
    }
  ));

  console.log("Doctor Id", doctorOptions)

  const dayOfWeekOptions = [
    {label: "Sturday", value : 1,},
    {label: "Sunday", value : 2,},
    {label: "Monday", value : 3,},
    {label: "Thuesday", value : 4,},
    {label: "Winsday", value : 5,},
    {label: "Tearsday", value : 6,},
    {label: "Friday", value : 7,},
  ]

  return (
    <BaseCrudPage
      title="Schechules"
      service={ScheduleApi}
      fields={[
        {
          name: "scheduleDate",
          label: "Schedule Date",
          type: "date",
        },
        {
          name: "dayOfWeek",
          label: "Day of Week",
          type: "select",
          options: dayOfWeekOptions,
        },
        {
          name: "startTime",
          label: "Start Time",
          type: "time",
        },
        {
          name: "endTime",
          label: "End Time",
          type: "time",
        },
        {
          name: "maxPatients",
          label: "Max Patients",
          type: "number",
        },
        {
          name: "doctorId",
          label: "Doctor",
          type: "select",
          options: doctorOptions,
        },
      ]}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "scheduleDate", header: "Schedule Date" },
        { accessorKey: "dayOfWeek", header: "Day of Week" },
        { accessorKey: "doctorId", header: "Doctor" },
        { accessorKey: "startTime", header: "Start Time" },
        { accessorKey: "endTime", header: "End Time" },
        { accessorKey: "maxPatients", header: "Max Patients" },
      ]}
      mapFormToPayload={(formData) => ({
        scheduleDate: formData.scheduleDate,
        dayOfWeek: Number(formData.dayOfWeek),
        doctorId: Number(formData.doctorId),
        endTime: formData.endTime,
        maxPatients: Number(formData.maxPatients),
        startTime: formData.startTime,
      })}
    />
  );
};

export default SchedulePage;
