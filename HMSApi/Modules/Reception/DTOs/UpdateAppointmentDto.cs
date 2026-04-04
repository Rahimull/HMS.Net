
namespace HMSApi.Mudoles.Reception.DTOs;

public record UpdateAppointmentDto(
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    string PateintName,

    int ReceptionDoctorId,

    int DepartmentId
);

