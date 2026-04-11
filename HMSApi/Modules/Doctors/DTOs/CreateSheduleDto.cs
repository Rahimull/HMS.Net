
namespace HMSApi.Modules.Doctors.DTOs;



public record CreateScheduleDto(
    DateOnly ScheduleDate,
    DayOfWeek DayOfWeek,
    TimeOnly StartTime,
    TimeOnly EndTime,
    int MaxPatients,
    int DoctorId);




