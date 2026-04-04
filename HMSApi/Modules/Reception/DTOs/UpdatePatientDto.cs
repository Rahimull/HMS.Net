using System.ComponentModel.DataAnnotations;
using HMSApi.Common.Enums;

namespace HMSApi.Mudoles.Reception.DTOs;


public class UpdatePatientDto
{

    // First Name Of Patient
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = null!;

    // Last Name Of Patient
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = null!;

    // Patient Gender that is enum like Gender = {Unknown=0, Male=1, Female=2}
    [Range(0, 2)]
    public Gender Gender { get; set; }

    // Patient Date Of Birth
    public DateOnly DOB { get; set; }

    // Patient phone number this also Indix
    [Required]
    [Phone]
    [MaxLength(20)]
    public string Phone { get; set; } = null!;


    // patient Address
    [MaxLength(255)]
    public string? Address { get; set; }

    // pateint National Id Card number
    [MaxLength(50)]
    public string? NationalId { get; set; }

}