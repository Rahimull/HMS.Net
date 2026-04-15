namespace HMSApi.Modules.HR.DTOs;


public record CreatePayrollDto(
       DateTime PayrollDate,
       decimal BaseSalary,
       decimal Allowances,
       decimal Deductions,
       decimal NetSalary,
       int StrockQuantity,
       string? Notes,
       int EmployeeId
);