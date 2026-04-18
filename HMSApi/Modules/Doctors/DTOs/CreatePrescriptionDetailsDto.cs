
namespace HMSApi.Modules.Doctors.DTOs;

public record CreatePrescriptionDetailsDto(
  string MedicationName,
  string Dosage,
  string Frequency,
  DateTime StartDate,
  DateTime EndDate,
  int PrescriptionId,
  int MedicineId
  );




