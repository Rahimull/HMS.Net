namespace HMSApi.Modules.User.DTOs;

public class AssignRoleDto
{
    public int UserId { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = [];
}