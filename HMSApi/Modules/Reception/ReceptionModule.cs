

using HMSApi.Modules.Reception.Repositories;
using HMSApi.Modules.Reception.ReceptionMapping;
using HMSApi.Modules.Reception.Services;

namespace HMSApi.Modules.Reception;

public static class ReceptionModule
{
    public static IServiceCollection AddReceptionModule(
     this IServiceCollection services
    )
    {

        // ===============================
        // Repositories
        // ===============================
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IMedicalRecordRepository, MedicalRecordRepository>();
        services.AddScoped<IAppointmentRepository, AppointmentRepository>();
        services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IMedicalRecordService, MedicalRecordService>();
        services.AddScoped<IAppointmentService, AppointmentService>();
        services.AddScoped<IDepartmentService, DepartmentService>();
        



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(ReceptionProfile).Assembly);





        return services;
    }
}