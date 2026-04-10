
namespace HMSApi.Modules.Doctors.DTOs;

public record CreateDoctorDto(
   string FirstName,
   string LastName,
   string Specialization,
   string Email,
   bool IsActive,
   decimal Fee,
   string PhoneNumber,
   int DepartmentId
);




