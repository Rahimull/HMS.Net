using AutoMapper;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;


namespace HMSApi.Mudoles.Pharmacy.PharmacyMapping;

public class PharmacyProfile : Profile
{
    public PharmacyProfile()
    {
        
        // Sale Mappings
        CreateMap<CreateSaleDto, Sale>();
        CreateMap<UpdateSaleDto, Sale>();
        CreateMap<Sale, SaleDto>()
        // .ForCtorParam("PatientName", opt => opt.MapFrom(src => src.Patient.FirstName + " " + src.Patient.LastName))
        // .ForCtorParam("DoctorName", opt => opt.MapFrom(src => src.Doctor.FirstName + " " + src.Doctor.LastName))
        // .ForCtorParam("PrescriptionName", opt => opt.MapFrom(src => src.Prescription.Patient.FirstName))
        ;



        // SaleDetails Mappings
        CreateMap<CreateSaleDetailsDto, SaleDetails>();
        CreateMap<UpdateSaleDetailsDto, SaleDetails>();
        CreateMap<SaleDetails, SaleDetailsDto>()
            // .ForCtorParam("SaleName", opt => opt.MapFrom(src => src.Sale.Patient.FirstName + " " + src.Sale.Patient.LastName))
            // .ForCtorParam("MedicineName", opt => opt.MapFrom(src => src.Medicine.Name))
            ;


    }
}