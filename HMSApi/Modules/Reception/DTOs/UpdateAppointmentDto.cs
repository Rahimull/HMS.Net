
namespace HMSApi.Modules.Reception.DTOs;

public record UpdateAppointmentDto(
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    int DoctorId,

    int DepartmentId
);

