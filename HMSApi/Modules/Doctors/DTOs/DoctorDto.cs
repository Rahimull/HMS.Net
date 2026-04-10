
namespace HMSApi.Modules.Doctors.DTOs;

public record DoctorDto(
   int Id,
   string FirstName,
   string LastName,
   string Specialization,
   string Email,
   bool IsActive,
   decimal Fee,
   string PhoneNumber,
   int DepartmentId,
   string DepartmentName
);




