
namespace HMSApi.Modules.Doctors.DTOs;

public record UpdateDoctorDto(
   string FIrstName,
   string LastName,
   string Specialization,
   string Email,
   bool IsActive,
   decimal Fee,
   string PhoneNumber,
   int DepartmentId,
   string DepartmentName
);




