


using AutoMapper;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.DTOs;

namespace HMSApi.Modules.Reception.ReceptionMapping;
public class ReceptionProfile : Profile
{
    public ReceptionProfile()
    {
        // Patient Mappings
        CreateMap<CreatePatientDto, Patient>();
        CreateMap<UpdatePatientDto, Patient>();
        CreateMap<Patient, PatientDto>();

        // Department Mappings
        CreateMap<CreateDepartmentDto, Department>();
        CreateMap<UpdateDepartmentDto, Department>();
        CreateMap<Department, DepartmentDto>();

        // Appointment Mappings
        CreateMap<CreateAppointmentDto, Appointment>();
        CreateMap<UpdateAppointmentDto, Appointment>();
        CreateMap<Appointment, AppointmentDto>();


        // MedicalRecord Mappings
        CreateMap<CreateMedicalRecordDto, MedicalRecord>();
        CreateMap<UpdateMedicalRecordDto, MedicalRecord>();
        CreateMap<MedicalRecord, MedicalRecordDto>();

        
    }
}