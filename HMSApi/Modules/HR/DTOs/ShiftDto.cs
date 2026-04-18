namespace HMSApi.Modules.HR.DTOs;


public record ShiftDto(
        int Id,
       DateOnly ShiftDate,
       TimeOnly StartTime,
       TimeOnly EndTime,
       string? Notes,
       int EmployeeId,
       string? EmployeeName
);