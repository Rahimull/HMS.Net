using AutoMapper;
using HMSApi.Data;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Modules.Store.Entities;
using HMSApi.Services;
using HMSApi.Specifications;
using Microsoft.EntityFrameworkCore;

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

    //  CREATE SALE WITH FEFO + STOCK CONTROL
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

            decimal total = 0;

            foreach (var d in dto.Details)
            {
                //  1. Get Item
                var item = await _context.Items.FindAsync(d.ItemId);
                if (item == null)
                    throw new Exception($"Item not found: {d.ItemId}");

                //  2. Get all stocks (FEFO)
                var stocks = await _context.ItemStocks
                    .Where(x => x.ItemId == d.ItemId && x.Quantity > 0)
                    .OrderBy(x => x.ExpiryDate ?? DateOnly.MaxValue)
                    .ToListAsync();

                if (!stocks.Any())
                    throw new Exception($"No stock available for {item.Name}");

                int remaining = d.Quantity;

                //  3. Price
                var price = d.UnitPrice ?? item.Price;

                foreach (var stock in stocks)
                {
                    if (remaining <= 0) break;

                    var usedQty = Math.Min(stock.Quantity, remaining);

                    //  Deduct from batch
                    stock.Quantity -= usedQty;

                    remaining -= usedQty;

                    var subTotal = (usedQty * price) - d.Discount;

                    total += subTotal;

                    //  Create SaleDetails (per batch)
                    sale.SaleDetails.Add(new SaleDetails
                    {
                        ItemId = d.ItemId,
                        Quantity = usedQty,
                        UnitPrice = price,
                        Discount = d.Discount,
                        TotalPrice = subTotal
                    });
                }

                if (remaining > 0)
                    throw new Exception($"Not enough stock for {item.Name}");

                //  4. Update CurrentStock
                var current = await _context.CurrentStocks
                    .FirstOrDefaultAsync(x => x.ItemId == d.ItemId);

                if (current != null)
                {
                    current.Quantity -= d.Quantity;
                    current.LastUpdate = DateTime.UtcNow;
                }
            }

            sale.TotalAmount = total;

            //  Save
            await _context.Set<Sale>().AddAsync(sale);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            //  RETURN DTO (clean)
            var result = await _context.Set<Sale>()
                .Where(x => x.Id == sale.Id)
                .Select(x => new SaleDto
                {
                    Id = x.Id,
                    SaleDate = x.SaleDate,
                    TotalAmount = x.TotalAmount,
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