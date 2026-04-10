
namespace HMSApi.Modules.Reception.DTOs;

public record MedicalRecordDto(
    int Id,
    string RecordNumber,
    int PatientId
);
