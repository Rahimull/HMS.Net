

namespace HMSApi.Mudoles.Reception.DTOs;

public record UpdateReceptionDoctorDto(
    string FullName,
    int DepartmentId,
    decimal Fee
);