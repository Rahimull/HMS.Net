using AutoMapper;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.Store.Services;


public class PurchaseDetailService : BaseService<PurchaseDetail, PurchaseDetailsDto, CreatePurchaseDetailsDto, UpdatePurchaseDetailsDto>, IPurchaseDetailsService
{
    public PurchaseDetailService(IPurchaseDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<PurchaseDetail> BuildSpecification(QueryParams query)
    {
        return new PurchaseDetailSpecification(query);
    }


}