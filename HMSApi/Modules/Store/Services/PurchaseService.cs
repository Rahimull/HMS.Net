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
            // 1️⃣ Build Purchase
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
                }).ToList() ?? new()
            };

            // 2️⃣ SAVE PURCHASE (IMPORTANT: repo already saves)
            await _repo.AddAsync(entity);

            // 3️⃣ STOCK MOVEMENTS
            foreach (var d in entity.PurchaseDetails)
            {
                _context.ItemStocks.Add(new ItemStock
                {
                    ItemId = d.ItemId,
                    Quantity = d.Quantity,
                    Type = StockMovementType.Purchase,
                    BatchNumber = d.BatchNumber,
                    ExpiryDate = d.ExpiryDate,
                    ReferenceId = entity.Id, // ✔ now valid after save
                    ReferenceType = StockReferenceType.Purchase,
                    Date = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync();

            // 4️⃣ TOTAL PRICE UPDATE
            entity.TotalPrice = entity.PurchaseDetails.Sum(x => x.Quantity * x.UnitPrice);
            await _repo.UpdateAsync(entity);

            // 5️⃣ COMMIT
            await transaction.CommitAsync();

            // 6️⃣ LOAD FULL DATA
            var created = await _repo.Query()
                .Include(x => x.Supplier)
                .Include(x => x.PurchaseDetails)
                    .ThenInclude(d => d.Item)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);

            if (created == null)
                throw new Exception("Purchase creation failed");

            return _mapper.Map<PurchasesDto>(created);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}