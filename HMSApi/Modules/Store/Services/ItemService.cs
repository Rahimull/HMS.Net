using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
using Microsoft.EntityFrameworkCore;
namespace HMSApi.Modules.Store.Services;


public class ItemService : BaseService<Item, ItemDto, CreateItemDto, UpdateItemDto>, IItemService
{
    private readonly IItemRepository _itemRepository;
    public ItemService(IItemRepository repo, IMapper mapper) : base(repo, mapper)
    {
        _itemRepository = repo;
    }

    protected override ISpecification<Item> BuildSpecification(QueryParams query)
    {
        return new ItemSpecification(query);
    }




    private async Task<string> GenerateItemCode()
    {
        var lastItem = await _itemRepository.Query()
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync();

        var nextNumber = (lastItem?.Id ?? 0) + 1;
        return $"ITM{nextNumber:D5}";
    }


    public override async Task<ItemDto> AddAsync(CreateItemDto dto)
    {
        var entity = _mapper.Map<Item>(dto);
        entity.Code = await GenerateItemCode();
        await _itemRepository.AddAsync(entity);
        return _mapper.Map<ItemDto>(entity);
    }

    
}