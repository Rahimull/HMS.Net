

using Microsoft.AspNetCore.Identity;

namespace HMSApi.Models;

public class AppUser : IdentityUser<int>
{
    public string FullName { get; set; } = null!;
}