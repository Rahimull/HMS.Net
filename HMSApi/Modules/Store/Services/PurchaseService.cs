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
            //  Build Purchase (NULL SAFE)
            var entity = new Purchases
            {
                SupplierId = dto.SupplierId,
                Notes = dto.Notes,
                PurchaseDate = dto.PurchaseDate,

                PurchaseDetails = dto.Details?.Select(d => new PurchaseDetail
                {
                    ItemId = d.ItemId,
                    Quantity = d.Quantity,
                    UnitPrice = d.UnitPrice,
                    BatchNumber = d.BatchNumber,
                    ExpiryDate = d.ExpiryDate
                }).ToList() ?? new List<PurchaseDetail>()
            };

            //  SAVE PURCHASE
            await _repo.AddAsync(entity);

            
            foreach (var d in entity.PurchaseDetails)
            {
                 // 1. STOCK MOVEMENTS (HISTORY)
                _context.ItemStocks.Add(new ItemStock
                {
                    ItemId = d.ItemId,
                    Quantity = d.Quantity,
                    Type = StockMovementType.Purchase,
                    BatchNumber = d.BatchNumber,
                    ExpiryDate = d.ExpiryDate,
                    ReferenceId = entity.Id,
                    ReferenceType = StockReferenceType.Purchase,
                    Date = DateTime.UtcNow
                });

                // 2. CURRENT STOCK (REAL STOCK)
                var stock = await _context.Set<CurrentStock>()
                    .FirstOrDefaultAsync(x => x.ItemId == d.ItemId);
                if (stock == null)
                {
                    // Create new Current Stock
                    _context.Set<CurrentStock>().Add(new CurrentStock
                    {
                        ItemId = d.ItemId,
                        Quantity = d.Quantity,
                        LastUpdate = DateTime.UtcNow
                    });
                }
                else
                {
                    // Update Exist Current Stock
                    stock.Quantity += d.Quantity;
                    stock.LastUpdate = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync();

            //  TOTAL PRICE (SAFE)
            entity.TotalPrice = entity.PurchaseDetails != null
                ? entity.PurchaseDetails.Sum(x => (x.Quantity) * (x.UnitPrice))
                : 0;

            await _repo.UpdateAsync(entity);

            //  COMMIT
            await transaction.CommitAsync();

            //  LOAD FULL DATA (SAFE INCLUDE)
            var created = await _repo.Query()
                .Include(x => x.Supplier)
                .Include(x => x.PurchaseDetails)
                    .ThenInclude(d => d.Item)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);

            if (created == null)
                throw new Exception("Purchase creation failed");

            //  MANUAL SAFE MAPPING (BEST PRACTICE )
            var result = new PurchasesDto
            {
                Id = created.Id,
                SupplierId = created.SupplierId,
                SupplierName = created.Supplier != null ? created.Supplier.Name : "",

                Notes = created.Notes,
                PurchaseDate = created.PurchaseDate,
                TotalPrice = created.TotalPrice,

                Details = created.PurchaseDetails != null
                    ? created.PurchaseDetails.Select(d => new PurchaseDetailsDto
                    {
                        Id = d.Id,
                        Quantity = d.Quantity,
                        UnitPrice = d.UnitPrice,
                        SubTotal = d.Quantity * d.UnitPrice,
                        BatchNumber = d.BatchNumber,
                        ExpiryDate = d.ExpiryDate,
                        PurchaseId = d.PurchaseId,
                        ItemId = d.ItemId,
                        ItemName = d.Item != null ? d.Item.Name : "",
                    }).ToList()
                    : new List<PurchaseDetailsDto>()
            };

            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine("ERROR => " + ex.ToString()); 
            await transaction.RollbackAsync();
            throw;
        }
    }
}