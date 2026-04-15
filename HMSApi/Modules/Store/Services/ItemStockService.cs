using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;
using HMSApi.Specifications;


public class ItemStockService : BaseService<ItemStock, ItemStockDto, CreateItemStockDto, UpdateItemStockDto>, IItemStockService
{
    public ItemStockService(IItemStockRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<ItemStock> BuildSpecification(QueryParams query)
    {
        return new ItemStockSpecification(query);
    }
}