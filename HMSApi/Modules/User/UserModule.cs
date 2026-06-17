

using HMSApi.Modules.User.UserMapping;
using HMSApi.Modules.User.Services;

namespace HMSApi.Modules.User;

public static class UserModule
{
    public static IServiceCollection AddUserModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IUserService, UserService>();
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(UserProfile).Assembly);





        return services;
    }
}