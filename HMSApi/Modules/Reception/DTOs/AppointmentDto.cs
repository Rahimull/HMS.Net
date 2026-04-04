
namespace HMSApi.Mudoles.Reception.DTOs;

public record AppointmentDto(
    int Id,
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    string PateintName,

    int ReceptionDoctorId,
    string ReceptionDoctorName,

    int DepartmentId, 
    string DepartmentName
);


