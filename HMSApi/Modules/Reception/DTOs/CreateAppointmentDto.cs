
namespace HMSApi.Modules.Reception.DTOs;

public record CreateAppointmentDto(
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    string PateintName,

    int DoctorId,

    int DepartmentId
);

