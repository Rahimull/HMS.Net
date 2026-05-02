using AutoMapper;
using HMSApi.Data;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Store.Entities;
using HMSApi.Common.Enums;
using HMSApi.Services;
using HMSApi.Specifications;
using Microsoft.EntityFrameworkCore;
using HMSApi.Modules.Pharmacy.Repositories;

namespace HMSApi.Modules.Pharmacy.Services;

public class SaleService
    : BaseService<Sale, SaleDto, CreateSaleDto, UpdateSaleDto>, ISaleService
{
    private readonly HMSDBC _context;

    public SaleService(
        ISaleRepository repo,
        IMapper mapper,
        HMSDBC context
    ) : base(repo, mapper)
    {
        _context = context;
    }

    protected override ISpecification<Sale> BuildSpecification(QueryParams query)
    {
        return new SaleSpecification(query);
    }

    // ================= CREATE SALE (FEFO + STOCK SAFE) =================
    public override async Task<SaleDto> AddAsync(CreateSaleDto dto)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var sale = new Sale
            {
                SaleDate = dto.SaleDate ?? DateTime.UtcNow,
                Notes = dto.Notes,
                IsPaid = dto.IsPaid,
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                PrescriptionId = dto.PrescriptionId
            };

            decimal totalAmount = 0;
            decimal totalProfit = 0;

            foreach (var d in dto.Details)
            {
                var item = await _context.Items.FindAsync(d.ItemId);
                if (item == null)
                    throw new Exception($"Item not found: {d.ItemId}");

                // FEFO STOCK
                var stocks = await _context.ItemStocks
                    .Where(x => x.ItemId == d.ItemId && x.RemainingQuantity > 0)
                    .OrderBy(x => x.ExpiryDate ?? DateOnly.MaxValue)
                    .ToListAsync();

                if (!stocks.Any())
                    throw new Exception($"No stock available for {item.Name}");

                int remaining = d.Quantity;
                int totalUsed = 0;

                var unitDiscount = d.Discount / d.Quantity;

                foreach (var stock in stocks)
                {
                    if (remaining <= 0) break;

                    var usedQty = Math.Min(stock.RemainingQuantity, remaining);

                    stock.RemainingQuantity -= usedQty;
                    remaining -= usedQty;
                    totalUsed += usedQty;

                    var unitProfit = (d.UnitPrice - stock.BuyPrice - unitDiscount);
                    var lineTotal = usedQty * (d.UnitPrice - unitDiscount) ?? 0m;

                    totalAmount += lineTotal;
                    totalProfit += usedQty * unitProfit ?? 0m;

                    sale.SaleDetails.Add(new SaleDetails
                    {
                        ItemId = d.ItemId,
                        ItemStockId = stock.Id,
                        Quantity = usedQty,
                        UnitPrice = d.UnitPrice ?? 0m,
                        BuyPrice = stock.BuyPrice,
                        Discount = d.Discount,
                        // TotalPrice = lineTotal
                    });

                    // STOCK MOVEMENT (OUT)
                    _context.Set<StockMovement>().Add(new StockMovement
                    {
                        ItemStockId = stock.Id,
                        Quantity = -usedQty,
                        Type = StockMovementType.Sale,
                        ReferenceId = sale.Id,
                        ReferenceType = StockReferenceType.Sale,
                        Notes = "Sale deduction"
                    });
                }

                if (remaining > 0)
                    throw new Exception($"Not enough stock for {item.Name}");

                // CURRENT STOCK UPDATE
                var current = await _context.CurrentStocks
                    .FirstOrDefaultAsync(x => x.ItemId == d.ItemId);

                if (current != null)
                {
                    current.Quantity -= totalUsed;
                    current.LastUpdate = DateTime.UtcNow;
                }
            }

            sale.TotalAmount = totalAmount;
            sale.TotalProfit = totalProfit;

            await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            // RETURN DTO
            var result = await _context.Sales
                .Where(x => x.Id == sale.Id)
                .Include(x => x.SaleDetails)
                    .ThenInclude(d => d.Item)
                .Select(x => new SaleDto
                {
                    Id = x.Id,
                    SaleDate = x.SaleDate,
                    TotalAmount = x.TotalAmount,
                    TotalProfit = x.TotalProfit,
                    IsPaid = x.IsPaid,
                    Notes = x.Notes,

                    Details = x.SaleDetails.Select(d => new SaleDetailsDto
                    {
                        Id = d.Id,
                        ItemId = d.ItemId,
                        ItemName = d.Item.Name,
                        Quantity = d.Quantity,
                        UnitPrice = d.UnitPrice,
                        Discount = d.Discount,
                        TotalPrice = d.TotalPrice
                    }).ToList()
                })
                .FirstAsync();

            return result;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new Exception("Sale failed: " + ex.Message);
        }
    }
}