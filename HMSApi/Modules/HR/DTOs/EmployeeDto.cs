using HMSApi.Common.Enums;

namespace HMSApi.Modules.HR.DTOs;


public record EmployeeDto(
        int Id,
       string Name,
        string EmployeeNumber,
        string Role,
        string? Phone,
        string? Email,
        DateOnly HireDate,
        EmployeeStatus Status,
        int DepartmentId,
        string? DepartmentName
);
