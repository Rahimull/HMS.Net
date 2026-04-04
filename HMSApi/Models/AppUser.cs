

using Microsoft.AspNetCore.Identity;

namespace HMSApi.Models;

public class AppUser : IdentityUser
{
    public string FullName { get; set; } = null!;
}