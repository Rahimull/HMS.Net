
namespace HMSApi.Modules.Doctors.DTOs;
public record UpdateDiagnosisDto(
    string DiagnosisName,
    string DiagnosisDetails,
    DateTime DiagnosisDate,
    int ConsultationId
);




