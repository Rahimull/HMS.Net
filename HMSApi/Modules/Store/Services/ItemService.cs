using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Store.Services;


public class ItemService : BaseService<Items, ItemDto, CreateItemDto, UpdateItemDto>, IItemService
{
    public ItemService(IItemRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Items> BuildSpecification(QueryParams query)
    {
        return new ItemSpecification(query);
    }
}