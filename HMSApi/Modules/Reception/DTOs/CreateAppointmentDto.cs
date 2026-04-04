
namespace HMSApi.Mudoles.Reception.DTOs;

public record CreateAppointmentDto(
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    string PateintName,

    int ReceptionDoctorId,

    int DepartmentId
);

