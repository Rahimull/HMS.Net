using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Store.Services;


public class CurrentStockService : BaseService<CurrentStock, CurrentStockDto, CreateCurrentStockDto, UpdateCurrentStockDto>, ICurrentStockService
{
    public CurrentStockService(ICurrentStockRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<CurrentStock> BuildSpecification(QueryParams query)
    {
        return new CurrentStockSpecification(query);
    }
}