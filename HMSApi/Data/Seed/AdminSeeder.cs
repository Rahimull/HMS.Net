using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Identity;

namespace HMSApi.Data.Seed;

public static class AdminSeeder
{
    public static async Task SeedAsync(UserManager<AppUser> userManager)
    {
        var adminEmail = "admin@hms.com";

        var admin = await userManager.FindByEmailAsync(adminEmail);

        if (admin == null)
        {
            admin = new AppUser
            {
                UserName = "admin",
                Email = adminEmail,
                FullName = "System Admin",
                IsActive = true
            };

            var result = await userManager.CreateAsync(admin, "Admin@12345");

            if (result.Succeeded)
            {
                // await userManager.AddToRoleAsync(admin, "Admin");

                var roles = await userManager.GetRolesAsync(admin);

                if (!roles.Contains("Admin"))
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}