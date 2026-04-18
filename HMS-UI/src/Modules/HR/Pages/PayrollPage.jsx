import BaseCrudPage from "../../../pages/Template/BaseCrudPage";
import PayrollApi from "../../../api/hr/PayrollApi";
import { useEffect, useState } from "react";
import EmployeeApi from "@/api/hr/EmployeeApi";
const PayrollPage = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(()=>{
    EmployeeApi.getPaged({page:1, pageSize:2000})
      .then(res => setEmployees(res.data.data.data));
  },[])

  const employeeOptions = employees.map(e=>({
    label:e.name,
    value: e.id
  }));
  return (
    <BaseCrudPage
      title="Payroll"
      service={PayrollApi}
      fields={[
        { name: "employeeId", label: "Employee", type: "select", options: employeeOptions },
        { name: "payrollDate", label: "Payroll Date", type: "Datetime-local" },
        { name: "baseSalary", label: "Base Salary", type: "number" },
        { name: "allowances", label: "Allowances", type: "number" },
        { name: "deductions", label: "Deductions", type: "number" },
        { name: "netSalary", label: "Net Salary", type: "number" },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "employeeId", header: "Employees", enableSorting: true },
        { accessorKey: "payrollDate", header: "Payroll Date" },
        { accessorKey: "baseSalary", header: "Base Salary" },
        { accessorKey: "allowances", header: "Allowances" },
        { accessorKey: "deductions", header: "Deductions" },
        { accessorKey: "netSalary", header: "Net Salaray" },
        { accessorKey: "notes", header: "Notes" },
      ]}
      mapFormToPayload={(form) => ({
        employeeId: Number(form.employeeId),
        payrollDate: form.payrollDate,
        baseSalary: (form.baseSalary),
        allowances: Number(form.allowances),
        deductions: Number(form.deductions),
        netSalary: Number(form.netSalary),
        notes: form.notes,
      })}
    />
  );
};

export default PayrollPage;
