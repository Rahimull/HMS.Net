
namespace HMSApi.Modules.Doctors.DTOs;



public record CreateScheduleDto(
    DateOnly ScheduleDate,
    DayOfWeek DayOfWeek,
    TimeOnly StartDate,
    TimeOnly EndTime,
    int MaxPatients,
    int DoctorId,
    string DoctorName
);




