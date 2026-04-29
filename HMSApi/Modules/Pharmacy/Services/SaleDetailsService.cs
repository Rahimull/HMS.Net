using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Pharmacy.Services;


public class SaleDetailsService
    : BaseService<SaleDetails, SaleDetailsDto, CreateSaleDetailsDto, UpdateSaleDetailsDto>, ISaleDetailsService
{
    public SaleDetailsService(ISaleDetailsRepository repo, IMapper mapper)
        : base(repo, mapper) { }

    protected override ISpecification<SaleDetails> BuildSpecification(QueryParams query)
    {
        return new SaleDetailsSpecification(query);
    }

    // ✅ business logic فقط اینجا
    public async Task AdmitSaleDetails(int SaleDetailsId)
    {
        // rules...
    }
}