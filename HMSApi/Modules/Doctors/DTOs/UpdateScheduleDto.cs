
namespace HMSApi.Modules.Doctors.DTOs;


public record UpdateScheduleDto(
    DateOnly ScheduleDate,
    DayOfWeek DayOfWeek,
    TimeOnly StartTime,
    TimeOnly EndTime,
    int MaxPatients,
    int DoctorId
);




