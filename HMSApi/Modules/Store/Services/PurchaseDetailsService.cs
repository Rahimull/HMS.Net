using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;
using HMSApi.Specifications;


public class PurchaseDetailService : BaseService<PurchaseDetail, PurchaseDetailDto, CreatePurchaseDetailDto, UpdatePurchaseDetailDto>, IPurchaseDetailsService
{
    public PurchaseDetailService(IPurchaseDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<PurchaseDetail> BuildSpecification(QueryParams query)
    {
        return new PurchaseDetailSpecification(query);
    }
}