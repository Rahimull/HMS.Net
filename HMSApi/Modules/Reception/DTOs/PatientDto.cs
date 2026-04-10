
using HMSApi.Common.Enums;
namespace HMSApi.Modules.Reception.DTOs;


// public class PatientDto
// {
//     // Patient Id that is PK
//     public int Id { get; set; }
    
//     // First Name Of Patient
//     public string FirstName { get; set; } = null!;

//     // Last Name Of Patient
//     public string LastName { get; set; } = null!;

//     // Patient Gender that is enum like Gender = {Male=1, Female=2}
//     public Gender Gender { get; set; }

//     // Patient Date Of Birth
//     public DateOnly DOB { get; set; }

//     // Patient phone number this also Indix
//     public string Phone { get; set; } = null!;


//     // patient Address
//     public string? Address { get; set; }

//     // pateint National Id Card number
//     public string? NationalId { get; set; }


// }

public record PatientDto(
    int Id,
    string FirstName,
    string LastName,
    Gender Gender,
    DateOnly DOB,
    string Phone,
    string? Address,
    string? NationalId
);