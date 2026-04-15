namespace HMSApi.Modules.HR.DTOs;


public record UpdateShiftDto(
       int Id,
       DateOnly ShiftDate,
       TimeOnly StartTime,
       TimeOnly EndTime,
       string? Notes,
       int EmployeeId
);