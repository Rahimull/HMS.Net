

using HMSApi.Modules.HR.Repositories;
using HMSApi.Modules.HR.Services;
using HMSApi.Mudoles.HR.HRMapping;

namespace HMSApi.Mudoles.HR;

public static class HRModule
{
    public static IServiceCollection AddHRModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IShiftRepository, ShiftRepository>();
        services.AddScoped<IPayrollRepository, PayrollRepository>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IEmployeeService, EmployeeService>();
        services.AddScoped<IShiftService, ShiftService>();
        services.AddScoped<IPayrollService, PayrollService>();
    
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(HRProfile).Assembly);





        return services;
    }
}