namespace HMSApi.Modules.HR.DTOs;


public record CreateShiftDto(
       int Id,
       DateOnly ShiftDate,
       TimeOnly StartTime,
       TimeOnly EndTime,
       string? Notes,
       int EmployeeId
);