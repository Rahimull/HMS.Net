
namespace HMSApi.Mudoles.Reception.DTOs;

public record ReceptionDoctorDto(
    int Id,
    string FullName,
    int DepartmentId,
    decimal Fee
);