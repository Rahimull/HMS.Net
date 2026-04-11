using AutoMapper;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;


namespace HMSApi.Mudoles.Doctors.DoctorMapping;

public class DoctorProfile : Profile
{
    public DoctorProfile()
    {
        // Consultation Mappings
        CreateMap<CreateConsultationDto, Consultation>();
        CreateMap<UpdateConsultationDto, Consultation>();
        CreateMap<Consultation, ConsultationDto>()
            .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.FirstName))
            .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor != null ? src.Doctor.FirstName : ""));

        // Diagnosis Mappings
        CreateMap<CreateDiagnosisDto, Diagnosis>();
        CreateMap<UpdateDiagnosisDto, Diagnosis>();
        CreateMap<Diagnosis, DiagnosisDto>();

        // Doctor Mappings
        CreateMap<CreateDoctorDto, Doctor>();
        CreateMap<UpdateDoctorDto, Doctor>();
        CreateMap<Doctor, DoctorDto>()
            .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : ""));


        // PrescriptionDetails Mappings
        CreateMap<CreatePrescriptionDetailsDto, PrescriptionDetails>();
        CreateMap<UpdatePrescriptionDetailsDto, PrescriptionDetails>();
        CreateMap<PrescriptionDetails, PrescriptionDetailsDto>();

        // Prescription Mappings
        CreateMap<CreatePrescriptionDto, Prescriptions>();
        CreateMap<UpdatePrescriptionDto, Prescriptions>();
        CreateMap<Prescriptions, PrescriptionDto>();

        // Schedule Mappings
        CreateMap<CreateScheduleDto, Schedules>();
        CreateMap<UpdateScheduleDto, Schedules>();
        CreateMap<Schedules, ScheduleDto>();
    }
}