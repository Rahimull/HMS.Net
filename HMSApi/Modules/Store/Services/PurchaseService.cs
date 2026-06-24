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
            // ================= VALIDATION =================
            if (dto.SupplierId <= 0)
                throw new Exception("Invalid Supplier");

            if (dto.Details == null || !dto.Details.Any())
                throw new Exception("Purchase must have at least one item");

            if (dto.Details.Any(x => x.ItemId <= 0))
                throw new Exception("Invalid ItemId detected");

            // ================= CREATE PURCHASE =================
            var entity = new Purchases
            {
                SupplierId = dto.SupplierId,
                Notes = dto.Notes,
                PurchaseDate = dto.PurchaseDate ?? DateTime.UtcNow,
            };

            entity.PurchaseDetails = dto.Details.Select(d => new PurchaseDetail
            {
                ItemId = d.ItemId,
                Quantity = d.Quantity,
                UnitPrice = d.UnitPrice,
                SalePrice = d.SalePrice,
                BatchNumber = d.BatchNumber,
                ExpiryDate = d.ExpiryDate
            }).ToList();

            entity.TotalPrice = entity.PurchaseDetails.Sum(x => x.Quantity * x.UnitPrice);

            await _repo.AddAsync(entity);

            // ================= LOAD CURRENT STOCK =================
            var itemIds = entity.PurchaseDetails.Select(x => x.ItemId).Distinct().ToList();

            var currentStocks = await _context.CurrentStocks
                .Where(x => itemIds.Contains(x.ItemId))
                .ToListAsync();

            // ================= GENERATE BATCHES FIRST =================
            foreach (var d in entity.PurchaseDetails)
            {
                if (string.IsNullOrWhiteSpace(d.BatchNumber))
                {
                    d.BatchNumber = await _batchNumber.GenerateAsync(); // ✅ once per line
                }
            }

            // ================= PROCESS EACH LINE =================
            foreach (var d in entity.PurchaseDetails)
            {
                // 🔹 Create ItemStock
                var itemStock = new ItemStock
                {
                    ItemId = d.ItemId,
                    InitialQuantity = d.Quantity,
                    RemainingQuantity = d.Quantity,
                    BuyPrice = d.UnitPrice,
                    SalePrice = d.SalePrice,
                    BatchNumber = d.BatchNumber!, // now guaranteed
                    ExpiryDate = d.ExpiryDate
                };

                await _context.ItemStocks.AddAsync(itemStock);

                // 🔹 Movement
                var movement = new StockMovement
                {
                    ItemStock = itemStock,
                    Quantity = d.Quantity,
                    UnitPrice = d.UnitPrice,
                    Type = StockMovementType.Purchase,
                    ReferenceId = entity.Id,
                    ReferenceType = StockReferenceType.Purchase,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.StockMovement.AddAsync(movement);

                // 🔹 CurrentStock
                var stock = currentStocks.FirstOrDefault(x => x.ItemId == d.ItemId);

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

            // ================= SAVE =================
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