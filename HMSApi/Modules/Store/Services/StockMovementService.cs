using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Store.Services;


public class StockMovementService : BaseService<StockMovement, StockMovementDto, CreateStockMovementDto, UpdateStockMovementDto>, IStockMovementService
{
    public StockMovementService(IStockMovementRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<StockMovement> BuildSpecification(QueryParams query)
    {
        return new StockMovementSpecification(query);
    }
}