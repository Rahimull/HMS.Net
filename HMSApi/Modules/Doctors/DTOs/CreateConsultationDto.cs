
namespace HMSApi.Modules.Doctors.DTOs;

public record CreateConsultationDto(
    DateTime VisitDate,
    string DhiefComplaint,
    string? Notes,
    string Examination,
    int DoctorId,
    string DoctorName,
    int PatientId,
    string PatientName  
);




