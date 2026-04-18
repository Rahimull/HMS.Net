namespace HMSApi.Modules.HR.DTOs;


public record UpdatePayrollDto(
       DateTime PayrollDate,
       decimal BaseSalary,
       decimal Allowances,
       decimal Deductions,
       decimal NetSalary,
       string? Notes,
       int EmployeeId
);