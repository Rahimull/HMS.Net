using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;

using System.Diagnostics;
using Hangfire;
using HMSApi.Common.Enums;
using HMSApi.Data;
using HMSApi.Specifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class ItemStockService : BaseService<ItemStock, ItemStockDto, CreateItemStockDto, UpdateItemStockDto>, IItemStockService
{
    private readonly HMSDBC _context;
    private readonly BatchNumberService _batchNumber;
    public ItemStockService(
        IItemStockRepository repo,
        IMapper mapper,
        HMSDBC context,
        BatchNumberService batchNumber
        ) : base(repo, mapper)
    {
        _context = context;
        _batchNumber = batchNumber;
    }
    public override async Task<ItemStockDto> AddAsync(CreateItemStockDto dto)
    {
        if (dto.Quantity <= 0)
            throw new Exception("Quantity must be greater than zero");

        using var tx = await _context.Database.BeginTransactionAsync();

        try
        {
            // 1. Batch number
            var batchNumber = await _batchNumber.GenerateAsync();

            var entity = _mapper.Map<ItemStock>(dto);
            entity.BatchNumber = batchNumber;

            await _repo.AddAsync(entity);

            // 2. Stock movement
            var movement = new StockMovement
            {
                ItemStockId = entity.Id,
                Quantity = dto.Quantity,
                Type = StockMovementType.Purchase,
                ReferenceType = dto.ReferenceType,
                ReferenceId = dto.ReferenceId,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Set<StockMovement>().AddAsync(movement);

            await _context.SaveChangesAsync();
            await tx.CommitAsync();

            return _mapper.Map<ItemStockDto>(entity);
        }
        catch
        {
            await tx.RollbackAsync();
            throw;
        }
    }


    protected override ISpecification<ItemStock> BuildSpecification(QueryParams query)
    {
        return new ItemStockSpecification(query);
    }
}


