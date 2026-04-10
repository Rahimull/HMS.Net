

using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Modules.Doctors.Services;
using HMSApi.Mudoles.Doctors.DoctorMapping;

namespace HMSApi.Mudoles.Doctors;

public static class DoctorModule
{
    public static IServiceCollection AddDoctorModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IDoctorRepository, DoctorRepository>();
        services.AddScoped<IConsultationRepository, ConsultationRepository>();
        services.AddScoped<IDiagnosisRepository, DiagnosisRepository>();
        services.AddScoped<ISchedulesRepository, SchedulesRepository>();
        services.AddScoped<IPrescriptionDetailsRepository, PrescriptionDetailsRepository>();
        services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IDoctorService, DoctorService>();
        services.AddScoped<IConsultationService, ConsultationService>();
        services.AddScoped<IPrescriptionDetailsService, PrescriptionDetailsService>();
        services.AddScoped<IPrescriptionService, PrescriptionService>();
        services.AddScoped<IDiagnosisService, DiagnosisService>();
        services.AddScoped<IScheduleService, ScheduleService>();
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(DoctorProfile).Assembly);





        return services;
    }
}