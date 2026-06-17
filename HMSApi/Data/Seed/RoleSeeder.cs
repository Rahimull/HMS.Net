using Microsoft.AspNetCore.Identity;

namespace HMSApi.Data.Seed;

public static class RoleSeeder
{
    public static async Task SeedAsync(RoleManager<IdentityRole<int>> roleManager)
    {
        string[] roles =
        {
            "Admin",
            "Doctor",
            "Nurse",
            "Pharmacist",
            "Receptionist",
            "LabTechnician",
            "StoreKeeper",
            "Accountant"
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole<int>(role));
            }
        }
    }
}