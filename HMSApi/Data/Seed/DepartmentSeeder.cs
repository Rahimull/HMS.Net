using HMSApi.Modules.Reception.Entities;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Data.Seed;

public static class DepartmentSeeder
{
    public static async Task SeedAsync(HMSDBC context)
    {
        if (await context.Departments.AnyAsync())
            return;

        var departments = new List<Department>
        {
            new Department { Name = "Administration" },
            new Department { Name = "Reception" },
            new Department { Name = "Pharmacy" },
            new Department { Name = "Laboratory" },
            new Department { Name = "Radiology" },
            new Department { Name = "Nursing" },
            new Department { Name = "Finance" },
            new Department { Name = "Store" }
        };

        await context.Departments.AddRangeAsync(departments);
        await context.SaveChangesAsync();
    }
}