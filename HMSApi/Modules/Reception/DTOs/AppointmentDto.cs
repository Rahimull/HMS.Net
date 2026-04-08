
namespace HMSApi.Mudoles.Reception.DTOs;

public record AppointmentDto(
    int Id,
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,

    int ReceptionDoctorId,

    int DepartmentId 
  
);


