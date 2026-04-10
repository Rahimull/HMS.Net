
namespace HMSApi.Modules.Doctors.DTOs;


public record UpdateScheduleDto(
    DateOnly ScheduleDate,
    DayOfWeek DayOfWeek,
    TimeOnly StartDate,
    TimeOnly EndTime,
    int MaxPatients,
    int DoctorId,
    string DoctorName
);




