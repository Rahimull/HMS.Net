
namespace HMSApi.Modules.Reception.DTOs;

public record AppointmentDto(
    int Id,
    DateOnly AppointmentDate,
    TimeOnly AppointmentTime,
    string? Notes,

    int PatientId,
    
    int DoctorId,

    int DepartmentId,
    string? PatientName,
    string? DoctorName,
    string? DepartmentName 
  
);


