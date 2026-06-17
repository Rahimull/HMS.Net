

using HMSApi.Modules.Reception.Entities;
using Microsoft.AspNetCore.Identity;


namespace HMSApi.Modules.User.Entities;

public class AppUser : IdentityUser<int>
{
    public string FullName { get; set; } = null!;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    
    public int? DepartmentId { get; set; }
    public Department? Department { get; set; }
    public string? ProfileImage { get; set; }
}