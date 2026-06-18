namespace HMSApi.Modules.User.DTOs;

public class RoleDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int UserCount { get; set; }
}