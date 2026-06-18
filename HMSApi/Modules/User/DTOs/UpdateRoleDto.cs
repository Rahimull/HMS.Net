using System.ComponentModel.DataAnnotations;

namespace HMSApi.Modules.User.DTOs;

public class UpdateRoleDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
}