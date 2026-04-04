
namespace HMSApi.Mudoles.Reception.DTOs;

public record CreateMedicalRecordDto(
    string RecordNumber,
    int PatientId
);