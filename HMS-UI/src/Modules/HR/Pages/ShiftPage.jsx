import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import ShiftApi from "@/api/hr/ShiftApi";
import { useEffect, useState } from "react";
import EmployeeApi from "@/api/hr/EmployeeApi";
const ShiftPage = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    EmployeeApi.getPaged({ page: 1, pageSize: 1000 }).then((res) =>
      setEmployees(res.data.data.data),
    );
  }, []);

  const departmentOption = employees.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return (
    <BaseCrudPage
      title="Shift"
      service={ShiftApi}
      fields={[
        { name: "employeeId", label: "Employee", type: "select", options: departmentOption},
        { name: "shiftDate", label: "Shift Date", type: "date" },
        { name: "startTime", label: "Start Time", type: "time" },
        { name: "endTime", label: "End Time", type: "time" },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "employeeName", header: "Doctors" },
        { accessorKey: "shiftDate", header: "Date" },
        { accessorKey: "startTime", header: "Start Time" },
        { accessorKey: "endTime", header: "End Time", enableSorting: true },
        { accessorKey: "notes", header: "Notes" },
      ]}
      mapFormToPayload={(form) => ({
        endTime: form.endTime,
        employeeId: Number(form.employeeId),
        shiftDate: form.shiftDate,
        startTime: form.startTime,
        notes: form.notes,
      })}
    />
  );
};

export default ShiftPage;
