import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import EmployeeApi from "@/api/hr/EmployeeApi";
import { useEffect, useState } from "react";
import DepartmentApi from "@/api/DepartmentApi";
const EmployeePage = () => {
  const [departments, setDepartments] = useState([])
  useEffect(()=>{
    DepartmentApi.getPaged({page:1, pageSize:1000})
      .then(res=> setDepartments(res.data.data.data));
  },[])

  const departmentOption = departments.map(d=>({
    label : d.name,
    value: d.id
  }));
  const employeeStatus = [
    {
      label: "Inactive",
      value: 0
    },
    {
      label: "Active",
      value: 1
    },
    {
      label: "Resigned",
      value: 2
    }
  ]
  return (
    <BaseCrudPage
      title="Employee"
      service={EmployeeApi}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "employeeNumber", label: "Employee Number", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "hireDate", label: "Hire Date", type: "date" },
        { name: "status", label: "Status", type: "select", options:employeeStatus},
        {
          name: "departmentId",
          label: "Department",
          type: "select",
          options: departmentOption,
        },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "name", header: "Name", enableSorting: true },
        { accessorKey: "employeeNumber", header: "Employee Number" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "phone", header: "Phone" },
        { accessorKey: "email", header: "email" },
        { accessorKey: "hireDate", header: "Hier Date" },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "departmentId", header: "Department" },
      ]}
      mapFormToPayload={(form) => ({
        name: form.name,
        employeeNumber: form.employeeNumber,
        role: form.role,
        phone: form.phone,
        email: form.email,
        hireDate: form.hireDate,
        status: Number(form.status),
        departmentId: Number(form.departmentId),
      })}
    />
  );
};

export default EmployeePage;
