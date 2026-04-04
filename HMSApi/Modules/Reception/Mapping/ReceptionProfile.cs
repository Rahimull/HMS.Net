


using AutoMapper;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;

namespace HMSApi.Mudoles.Reception.ReceptionMapping;
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

        // ReceptionDoctor Mappings
        CreateMap<CreateReceptionDoctorDto, ReceptionDoctor>();
        CreateMap<UpdateReceptionDoctorDto, ReceptionDoctor>();
        CreateMap<ReceptionDoctor, ReceptionDoctorDto>();

        // MedicalRecord Mappings
        CreateMap<CreateMedicalRecordDto, MedicalRecord>();
        CreateMap<UpdateMedicalRecordDto, MedicalRecord>();
        CreateMap<MedicalRecord, MedicalRecordDto>();

        
    }
}