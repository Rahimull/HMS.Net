
namespace HMSApi.Modules.Doctors.DTOs;

public record DiagnosisDto(
    int Id,
    string DiagnosisName,
    string DiagnosisDetails,
    DateTime DiagnosisDate,
    int ConsultationId,
    string? ConsultationName
);




