using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Pharmacy.Services;
using HMSApi.Specifications;


public class SaleService : BaseService<Sale, SaleDto, CreateSaleDto, UpdateSaleDto>, ISaleService
{
    public SaleService(ISaleRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Sale> BuildSpecification(QueryParams query)
    {
        return new SaleSpecification(query);
    }
}