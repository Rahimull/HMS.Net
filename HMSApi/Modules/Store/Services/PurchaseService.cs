using AutoMapper;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.Store.Services;


public class PurchaseService : BaseService<Purchases, PurchasesDto, CreatePurchasesDto, UpdatePurchasesDto>, IPurchaseService
{
    public PurchaseService(IPurchaseRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<Purchases> BuildSpecification(QueryParams query)
    {
        return new PurchaseSpecification(query);
    }


}