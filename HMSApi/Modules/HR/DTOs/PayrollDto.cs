namespace HMSApi.Modules.HR.DTOs;


public record PayrollDto(
        int Id,
       DateTime PayrollDate,
       decimal BaseSalary,
       decimal Allowances,
       decimal Deductions,
       decimal NetSalary,
       string? Notes,
       int EmployeeId,
       string? EmployeeName
);