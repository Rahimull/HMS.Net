using AutoMapper;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Entities;


namespace HMSApi.Mudoles.Finance.FinaMapping;

public class FinanceProfile : Profile
{
    public FinanceProfile()
    {
         

        // Invoice Mappings
        CreateMap<CreateInvoiceDto, Invoice>();
        CreateMap<UpdateInvoiceDto, Invoice>();
        CreateMap<Invoice, InvoiceDto>();

        // InvoiceDetails Mappings
        CreateMap<CreateInvoiceDetailsDto, InvoiceDetails>();
        CreateMap<UpdateInvoiceDetailsDto, InvoiceDetails>();
        CreateMap<InvoiceDetails, InvoiceDto>();

        // Payment Mappings
        CreateMap<CreatePaymentDto, Payment>();
        CreateMap<UpdatePaymentDto, Payment>();
        CreateMap<Payment, PaymentDto>();

    }
}