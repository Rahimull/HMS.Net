using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Pharmacy.Services;


public class SalePaymentService
    : BaseService<SalePayment, SalePaymentDto, CreateSalePaymentDto, UpdateSalePaymentDto>, ISalePaymentService
{
    
    public SalePaymentService(
        ISalePaymentRepository repo, 
        IMapper mapper 
        
        )
        : base(repo, mapper) {}

    protected override ISpecification<SalePayment> BuildSpecification(QueryParams query)
    {
        return new SalePaymentSpecification(query);
    }

    //  business logic فقط اینجا
    public async Task AdmitSalePayment(int SalePaymentId)
    {
        // rules...
    }
}