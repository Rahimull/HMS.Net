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
    : BaseService<Purchases, PurchasesDto, CreatePurchaseDto, UpdatePurchasesDto>, IPurchaseService
{
    private readonly HMSDBC _context;

    public PurchaseService(
        IPurchaseRepository repo,
        IMapper mapper,
        HMSDBC context
    ) : base(repo, mapper)
    {
        _context = context;
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
                PurchaseDate = dto.PurchaseDate,
            };

            entity.PurchaseDetails = dto.Details?.Select(d => new PurchaseDetail
            {
                ItemId = d.ItemId,
                Quantity = d.Quantity,
                UnitPrice = d.UnitPrice,
                BatchNumber = d.BatchNumber,
                ExpiryDate = d.ExpiryDate
            }).ToList() ?? new();

            entity.TotalPrice = entity.PurchaseDetails.Sum(x => x.Quantity * x.UnitPrice);

            await _repo.AddAsync(entity);

            var itemIds = entity.PurchaseDetails.Select(x => x.ItemId).ToList();
            var currentStock = await _context.CurrentStocks
                .Where(x => itemIds.Contains(x.ItemId))
                .ToListAsync();

            foreach (var d in entity.PurchaseDetails)
            {
                // 1. CREATE BATCH (ItemStock)
                var itemStock =  new ItemStock
                {
                    ItemId = d.ItemId,
                    InitialQuantity = d.Quantity,
                    BuyPrice = d.UnitPrice,
                    BatchNumber = d.BatchNumber,
                    ExpiryDate = d.ExpiryDate
                };
                await _context.ItemStocks.AddAsync(itemStock);
                
                // 2. Stock Movement (HISTORY)
                var stockMovement = new StockMovement
                {
                    ItemStock = itemStock, 
                    Quantity = d.Quantity,
                    Type = StockMovementType.Purchase,
                    ReferenceId = entity.Id,
                    ReferenceType = StockReferenceType.Purchase,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.StockMovement.AddAsync(stockMovement);
               
                // 3. Current Stock
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