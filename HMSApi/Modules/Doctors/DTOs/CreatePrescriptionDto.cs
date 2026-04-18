
namespace HMSApi.Modules.Doctors.DTOs;

public record CreatePrescriptionDto(
  int ConsultationId,
  int DoctorId,
  int PatientId
  );




