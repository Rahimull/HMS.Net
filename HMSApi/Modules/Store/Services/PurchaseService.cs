using AutoMapper;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
using Microsoft.EntityFrameworkCore;
using HMSApi.Data;
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.Services;

public class PurchaseService
    : BaseService<Purchases, PurchasesDto, CreatePurchaseDto, UpdatePurchaseDto>, IPurchaseService
{
    private readonly HMSDBC _context;
    private readonly BatchNumberService _batchNumber;

    public PurchaseService(
        IPurchaseRepository repo,
        IMapper mapper,
        HMSDBC context,
        BatchNumberService batchNumber
    ) : base(repo, mapper)
    {
        _context = context;
        _batchNumber = batchNumber;
    }

    // ================= SPECIFICATION =================
    protected override ISpecification<Purchases> BuildSpecification(QueryParams query)
    {
        return new PurchaseSpecification(query);
    }

    // ================= CREATE PURCHASE =================

public override async Task<PurchasesDto> AddAsync(CreatePurchaseDto dto)
{
    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
        var entity = new Purchases
        {
            SupplierId = dto.SupplierId,
            Notes = dto.Notes,
            PurchaseDate = dto.PurchaseDate ?? DateTime.UtcNow,
        };

        entity.PurchaseDetails = (dto.Details ?? new())
            .Select(d => new PurchaseDetail
            {
                ItemId = d.ItemId,
                Quantity = d.Quantity,
                UnitPrice = d.UnitPrice,
                ExpiryDate = d.ExpiryDate
            }).ToList();

        entity.TotalPrice = entity.PurchaseDetails.Sum(x => x.Quantity * x.UnitPrice);

        await _repo.AddAsync(entity);

        var itemIds = entity.PurchaseDetails.Select(x => x.ItemId).Distinct().ToList();

        var currentStock = await _context.CurrentStocks
            .Where(x => itemIds.Contains(x.ItemId))
            .ToListAsync();

        foreach (var d in entity.PurchaseDetails)
        {
            // 1. Generate batch if null (IMPORTANT FIX)
            var batchNumber = d.BatchNumber;

            if (string.IsNullOrEmpty(batchNumber))
            {
                batchNumber = await _batchNumber.GenerateAsync();
            }

            // 2. CREATE BATCH (ItemStock)
            var itemStock = new ItemStock
            {
                ItemId = d.ItemId,
                InitialQuantity = d.Quantity,
                RemainingQuantity = d.Quantity,
                BuyPrice = d.UnitPrice,
                BatchNumber = batchNumber,
                ExpiryDate = d.ExpiryDate
            };

            await _context.ItemStocks.AddAsync(itemStock);
            await _context.SaveChangesAsync(); // to get Id

            // 3. Stock Movement (HISTORY)
            var stockMovement = new StockMovement
            {
                ItemStockId = itemStock.Id,
                Quantity = d.Quantity,
                UnitPrice = d.UnitPrice,
                Type = StockMovementType.Purchase,
                ReferenceId = entity.Id,
                ReferenceType = StockReferenceType.Purchase,
                CreatedAt = DateTime.UtcNow
            };

            await _context.StockMovement.AddAsync(stockMovement);

            // 4. Current Stock
            var stock = currentStock.FirstOrDefault(x => x.ItemId == d.ItemId);

            if (stock == null)
            {
                await _context.CurrentStocks.AddAsync(new CurrentStock
                {
                    ItemId = d.ItemId,
                    Quantity = d.Quantity,
                    LastUpdate = DateTime.UtcNow
                });
            }
            else
            {
                stock.Quantity += d.Quantity;
                stock.LastUpdate = DateTime.UtcNow;
            }
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return _mapper.Map<PurchasesDto>(entity);
    }
    catch
    {
        await transaction.RollbackAsync();
        throw;
    }
}


}