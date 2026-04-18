namespace HMSApi.Modules.HR.DTOs;


public record UpdateShiftDto(
       DateOnly ShiftDate,
       TimeOnly StartTime,
       TimeOnly EndTime,
       string? Notes,
       int EmployeeId
);