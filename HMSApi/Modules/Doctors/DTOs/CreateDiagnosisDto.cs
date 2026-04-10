
namespace HMSApi.Modules.Doctors.DTOs;

public record CreateDiagnosisDto(
    string DiagnosisName,
    string DiagnosisDetails,
    DateTime DiagnosisDate,
    int ConsultationId
);




