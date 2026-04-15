

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
        services.AddScoped<IMedicineRepository, MedicineRepository>();
        services.AddScoped<IMedicineStockRepository, MedicineStockRepository>();
        services.AddScoped<IPharmacySaleRepository, PharmacySaleRepository>();
        services.AddScoped<IPharmacySaleDetailsRepository, PharmacySaleDetailsRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IPharmacySaleService, PharmacySaleService>();
        services.AddScoped<IPharmacySaleDetailsService, PharmacySaleDetailsService>();
        services.AddScoped<IMedicineService, MedicineService>();
        services.AddScoped<IMedicineStockService, MedicineStockService>();
    
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(PharmacyProfile).Assembly);





        return services;
    }
}