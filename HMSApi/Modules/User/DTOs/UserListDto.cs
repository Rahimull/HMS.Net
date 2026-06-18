namespace HMSApi.Modules.User.DTOs;

public class UserListDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public bool IsActive { get; set; }

    public string? DepartmentName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public string? ProfileImage { get; set; }

    public List<string> Roles { get; set; } = new();
}