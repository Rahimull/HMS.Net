using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;
using HMSApi.Specifications;


public class PurchaseDetailsService : BaseService<PurchaseDetail, PurchaseDetailsDto, CreatePurchaseDetailsDto, UpdatePurchaseDetailsDto>, IPurchaseDetailsService
{
    public PurchaseDetailsService(IPurchaseDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<PurchaseDetail> BuildSpecification(QueryParams query)
    {
        return new PurchaseDetailSpecification(query);
    }
}