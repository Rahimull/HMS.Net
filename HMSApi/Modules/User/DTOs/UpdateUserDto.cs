namespace HMSApi.Modules.User.DTOs;

public class UpdateUserDto
{
    public string FullName { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public int? DepartmentId { get; set; }

    public bool IsActive { get; set; }

    public string? ProfileImage { get; set; }
}