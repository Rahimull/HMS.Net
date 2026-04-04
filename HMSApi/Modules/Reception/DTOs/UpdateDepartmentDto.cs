using System.ComponentModel.DataAnnotations;
namespace HMSApi.Mudoles.Reception.DTOs;


public class UpdateDepartmentDto
{
    
    // Department Name
    [Required]
    [MaxLength(100)]
    public string Name  { get; set; } = null!;
    [MaxLength(255)]

    // Department Description
    public string? Description { get; set; }
}