
namespace HMSApi.Mudoles.Reception.DTOs;

public record MedicalRecordDto(
    int Id,
    string RecordNumber,
    int PatientId
);
