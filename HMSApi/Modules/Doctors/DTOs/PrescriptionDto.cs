
namespace HMSApi.Modules.Doctors.DTOs;

public record PrescriptionDto(
    int Id,
  int ConsultationId,
  int DoctorId,
  int PatientId,
  string ConsultationName,
  string DoctorName,
  string PatientName

);




