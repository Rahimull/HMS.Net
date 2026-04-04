
namespace HMSApi.Mudoles.Reception.DTOs;

public record CreateReceptionDoctorDto(
    string FullName,
    int DepartmentId,
    decimal Fee
);