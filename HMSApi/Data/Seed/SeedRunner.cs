using HMSApi.Data.Seed;
using HMSApi.Modules.User.Entities;
using Microsoft.AspNetCore.Identity;


namespace HMSApi.Data;

public static class SeedRunner
{
    public static async Task RunAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var context = services.GetRequiredService<HMSDBC>();

        await RoleSeeder.SeedAsync(roleManager);
        await DepartmentSeeder.SeedAsync(context);
        await AdminSeeder.SeedAsync(userManager);
        await PermissionSeeder.SeedAsync(context);
    }
}