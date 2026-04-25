

using HMSApi.Modules.Common.FinalMapping;
using HMSApi.Modules.Common.Repositories;
using HMSApi.Modules.Common.Services;

namespace HMSApi.Mudoles.Common;

public static class CommonModule
{
    public static IServiceCollection AddCommonModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IUnitRepository, UnitRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IUnitService, UnitService>();
        services.AddScoped<ICategoryService, CategoryService>();



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(CommonProfile).Assembly);





        return services;
    }
}