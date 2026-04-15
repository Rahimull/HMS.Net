using HMSApi.Common.Enums;

namespace HMSApi.Modules.HR.DTOs;


public record CreateEmployeeDto(
       string Name,
        string EmployeeNumber,
        string Role,
        string? Phone,
        string? Email,
        DateOnly HireDate,
        EmployeeStatus Status,
        int DepartmentId
);