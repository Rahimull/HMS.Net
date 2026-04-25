using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;

using Hangfire;
using HMSApi.Data;
using HMSApi.Specifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class ItemStockService : BaseService<ItemStock, ItemStockDto, CreateItemStockDto, UpdateItemStockDto>, IItemStockService
{
    private readonly HMSDBC _context;
    public ItemStockService(
        IItemStockRepository repo,
        IMapper mapper,
        HMSDBC context
        ) : base(repo, mapper)
    {
        _context = context;
    }

    public override async Task<ItemStockDto> AddAsync(CreateItemStockDto dto)
    {
        if (dto.Quantity <= 0)
            throw new Exception("Quantity must be greater than zero");

        var entity = _mapper.Map<ItemStock>(dto);
        entity.Date = DateTime.UtcNow;

        if (dto.ReferenceType == null)
            entity.ReferenceType = null;

        await _repo.AddAsync(entity);

        var created = await _repo.Query()
            .Where(x => x.Id == entity.Id)
            .Include(x => x.Item)
            .FirstOrDefaultAsync();
        
        if(created== null)
            throw new Exception("Stock create Faild");
        return _mapper.Map<ItemStockDto>(created);
    }


    protected override ISpecification<ItemStock> BuildSpecification(QueryParams query)
    {
        return new ItemStockSpecification(query);
    }
}