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
        .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient != null ? src.Patient.FirstName + " " + src.Patient.LastName : null))
        .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor != null ? src.Doctor.FirstName + " " + src.Doctor.LastName : null))
        .ForMember(dest => dest.SaleDetails, opt => opt.MapFrom(src => src.SaleDetails));

        // SaleDetails Mappings
        CreateMap<CreateSaleDetailsDto, SaleDetails>();
        CreateMap<UpdateSaleDetailsDto, SaleDetails>();
        CreateMap<SaleDetails, SaleDetailsDto>()
            .ForMember(dest => dest.ItemName, opt => opt.MapFrom(src => src.Item.Name));

        // SalePayment Mappings
        CreateMap<CreateSalePaymentDto, SalePayment>();
        CreateMap<UpdateSalePaymentDto, SalePayment>();
        CreateMap<SalePayment, SalePaymentDto>()
            .ForMember(dest => dest.PaymentDate, opt => opt.MapFrom(src =>src.PaymentDate));
    }
}