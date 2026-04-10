
namespace HMSApi.Modules.Doctors.DTOs;

public record CreatePrescriptionDto(
  int ConsultationId,
  int DoctorId,
  int PatientId,
  string ConsultationName,
  string DoctorName,
  string PatientName

);




