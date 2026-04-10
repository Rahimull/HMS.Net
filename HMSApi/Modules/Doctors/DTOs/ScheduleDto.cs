namespace HMSApi.Modules.Doctors.DTOs;


public record ScheduleDto(
    int Id,
    DateOnly ScheduleDate,
    DayOfWeek DayOfWeek,
    TimeOnly StartDate,
    TimeOnly EndTime,
    int MaxPatients,
    int DoctorId,
    string DoctorName
);




