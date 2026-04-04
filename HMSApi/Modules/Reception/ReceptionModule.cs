

using HMSApi.Mudoles.Reception.Repositories;
using HMSApi.Mudoles.Reception.ReceptionMapping;
using HMSApi.Mudoles.Reception.Services;

namespace HMSApi.Mudoles.Reception;

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
        services.AddScoped<IReceptionDoctorRepository, ReceptionDoctorRepository>();

        // ===============================
        // Services
        // ===============================
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IMedicalRecordService, MedicalRecordService>();
        services.AddScoped<IAppointmentService, AppointmentService>();
        services.AddScoped<IDepartmentService, DepartmentService>();
        services.AddScoped<IReceptionDoctorService, ReceptionDoctorService>();



        // ===============================
        // AutoMapper
        // ===============================\
        services.AddAutoMapper(typeof(ReceptionProfile).Assembly);





        return services;
    }
}