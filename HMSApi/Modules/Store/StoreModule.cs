

using HMSApi.Modules.Store.FinalMapping;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Modules.Store.Services;

namespace HMSApi.Mudoles.Store;

public static class StoreModule
{
    public static IServiceCollection AddStoreModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IPurchaseRepository, PurchaseRepository>();
        services.AddScoped<IPurchaseDetailsRepository, PurchaseDetailsRepository>();
        services.AddScoped<IItemRepository, ItemRepository>();
        services.AddScoped<IItemStockRepository, ItemStockRepository>();
        services.AddScoped<ISuplierRepository, SuplierRepository>();
        services.AddScoped<ICurrentStockRepository, CurrentStockRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IItemService, ItemService>();
        services.AddScoped<IPurchaseService, PurchaseService>();
        services.AddScoped<IPurchaseDetailsService, PurchaseDetailsService>();
        services.AddScoped<IItemStockService, ItemStockService>();
        services.AddScoped<ISuplierService, SuplierService>();
        services.AddScoped<ICurrentStockService, CurrentStockService>();
    
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(StoreProfile).Assembly);





        return services;
    }
}