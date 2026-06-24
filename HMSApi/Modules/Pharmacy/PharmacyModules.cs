

using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Modules.Pharmacy.Services;
using HMSApi.Mudoles.Pharmacy.PharmacyMapping;

namespace HMSApi.Mudoles.Pharmacy;

public static class DoctorModule
{
    public static IServiceCollection AddPharmacyModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<ISaleRepository, SaleRepository>();
        services.AddScoped<ISaleDetailsRepository, SaleDetailsRepository>();
        services.AddScoped<ISalePaymentRepository, SalePaymentRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<ISaleService, SaleService>();
        services.AddScoped<ISaleDetailsService, SaleDetailsService>();
        services.AddScoped<ISalePaymentService, SalePaymentService>();



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(PharmacyProfile).Assembly);





        return services;
    }
}