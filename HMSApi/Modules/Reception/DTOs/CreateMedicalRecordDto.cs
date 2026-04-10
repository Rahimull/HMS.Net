
namespace HMSApi.Modules.Reception.DTOs;

public record CreateMedicalRecordDto(
    string RecordNumber,
    int PatientId
);