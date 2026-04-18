namespace HMSApi.Modules.HR.DTOs;


public record CreateShiftDto(
       DateOnly ShiftDate,
       TimeOnly StartTime,
       TimeOnly EndTime,
       string? Notes,
       int EmployeeId
);