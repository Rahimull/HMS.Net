

using HMSApi.Modules.Finance.Repositories;
using HMSApi.Modules.Finance.Services;
using HMSApi.Mudoles.Finance.FinaMapping;

namespace HMSApi.Mudoles.Finance;

public static class HRModule
{
    public static IServiceCollection AddFinanceModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IInvoiceRepository, InvoiceRepository>();
        services.AddScoped<IInvoiceDetailsRepository, InvoiceDetailRepository>();
        services.AddScoped<IPaymentRepository, PaymentRepository>();
    
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IPaymentService, PaymentService>();
        services.AddScoped<IInvoiceService, InvoiceService>();
        services.AddScoped<IInvoiceDetailsService, InvoiceDetailsService>();
    
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(FinanceProfile).Assembly);





        return services;
    }
}