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
    private readonly ILogger<SaleService> _logger;
    private readonly ISaleRepository _saleRepository;

    public SaleService(
        ISaleRepository repo,
        IMapper mapper,
        HMSDBC context,
        ILogger<SaleService> logger
    ) : base(repo, mapper)
    {
        _context = context;
        _logger = logger;
        _saleRepository = repo;
    }

    private async Task<string> GenerateInvoiceNumber()
    {
        var lastInvoiceNumber = await _saleRepository.Query()
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync();

        var nextNumber = (lastInvoiceNumber?.Id ?? 0) + 1;
        return $"INV{nextNumber:D5}";
    }

    protected override ISpecification<Sale> BuildSpecification(QueryParams query)
        => new SaleSpecification(query);

    public override async Task<SaleDto> AddAsync(CreateSaleDto dto)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            dto.PatientId = dto.PatientId > 0 ? dto.PatientId : null;
            dto.DoctorId = dto.DoctorId > 0 ? dto.DoctorId : null;
            dto.PrescriptionId = dto.PrescriptionId > 0 ? dto.PrescriptionId : null;
            // ================= VALIDATION =================
            if (dto.PatientId.HasValue &&
                !await _context.Patients.AnyAsync(x => x.Id == dto.PatientId))
                throw new Exception($"Invalid PatientId: {dto.PatientId}");

            if (dto.DoctorId.HasValue &&
                !await _context.Doctors.AnyAsync(x => x.Id == dto.DoctorId))
                throw new Exception($"Invalid DoctorId: {dto.DoctorId}");

            if (dto.PrescriptionId.HasValue &&
                !await _context.Prescriptions.AnyAsync(x => x.Id == dto.PrescriptionId))
                throw new Exception($"Invalid PrescriptionId: {dto.PrescriptionId}");

            // ================= CREATE SALE =================
            var sale = new Sale
            {
                SaleDate = dto.SaleDate ?? DateTime.UtcNow,
                Notes = dto.Notes,
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                PrescriptionId = dto.PrescriptionId,
                PaidAmount = dto.PaidAmount,
                PaymentStatus = PaymentStatus.Pending,
                InvoiceNumber = await GenerateInvoiceNumber()
            };


            decimal totalAmount = 0;
            decimal totalProfit = 0;

            // ================= SALE DETAILS =================
            foreach (var d in dto.SaleDetails)
            {
                var item = await _context.Items.FindAsync(d.ItemId)
                    ?? throw new Exception($"Item not found: {d.ItemId}");

                var stocks = await _context.ItemStocks
                    .Where(x => x.ItemId == d.ItemId && x.RemainingQuantity > 0)
                    .OrderBy(x => x.ExpiryDate ?? DateOnly.MaxValue)
                    .ToListAsync();

                if (!stocks.Any())
                    throw new Exception($"No stock available for {item.Name}");

                int remaining = d.Quantity;
                decimal unitPrice = d.UnitPrice ?? 0m;
                decimal unitDiscount = d.Discount / d.Quantity;

                foreach (var stock in stocks)
                {
                    if (remaining <= 0) break;

                    var usedQty = Math.Min(stock.RemainingQuantity, remaining);

                    stock.RemainingQuantity -= usedQty;
                    remaining -= usedQty;

                    var netUnitPrice = unitPrice - unitDiscount;
                    var lineTotal = usedQty * netUnitPrice;
                    var profit = usedQty * (netUnitPrice - stock.BuyPrice);

                    totalAmount += lineTotal;
                    totalProfit += profit;

                    sale.SaleDetails.Add(new SaleDetails
                    {
                        ItemId = d.ItemId,
                        ItemStockId = stock.Id,
                        Quantity = usedQty,
                        UnitPrice = unitPrice,
                        BuyPrice = stock.BuyPrice,
                        Discount = d.Discount
                    });

                    _context.Set<StockMovement>().Add(new StockMovement
                    {
                        ItemStockId = stock.Id,
                        Quantity = -usedQty,
                        Type = StockMovementType.Sale,
                        ReferenceType = StockReferenceType.Sale,
                        Notes = "Sale deduction",
                        UnitPrice = unitPrice
                    });
                }

                if (remaining > 0)
                    throw new Exception($"Not enough stock for {item.Name}");

                var currentStock = await _context.CurrentStocks
                    .FirstOrDefaultAsync(x => x.ItemId == d.ItemId);

                if (currentStock != null)
                {
                    currentStock.Quantity -= d.Quantity;
                    currentStock.LastUpdate = DateTime.UtcNow;
                }
            }

            // ================= TOTALS =================
            sale.TotalAmount = totalAmount;
            sale.TotalProfit = Math.Max(0, totalProfit);

            sale.RemainingAmount = Math.Max(0, sale.TotalAmount - sale.PaidAmount);

            if (sale.PaidAmount == 0)
            {
                sale.PaymentStatus = PaymentStatus.Pending;
            }
            else if (sale.PaidAmount < sale.TotalAmount)
            {
                sale.PaymentStatus = PaymentStatus.PartialPaid;
            }
            else if (sale.PaidAmount == sale.TotalAmount)
            {
                sale.PaymentStatus = PaymentStatus.Paid;
            }
            else
            {
                sale.PaymentStatus = PaymentStatus.OverPaid; // یا Overpaid اگر enum داری
            }

            // ================= PAYMENT =================
            if (dto.PaidAmount > 0)
            {
                sale.SalePayments.Add(new SalePayment
                {
                    Amount = dto.PaidAmount,
                    PaymentDate = DateTime.UtcNow,
                    Notes = "Initial payment",
                    Sale = sale
                });
            }

            // ================= SAVE =================
            await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            // ================= RETURN =================
            var result = await _context.Sales
                .Where(x => x.Id == sale.Id)
                .Include(x => x.Patient)
                .Include(x => x.Doctor)
                .Include(x => x.SaleDetails)
                    .ThenInclude(d => d.Item)
                .Select(x => new SaleDto
                {
                    Id = x.Id,
                    SaleDate = x.SaleDate,
                    TotalAmount = x.TotalAmount,
                    TotalProfit = x.TotalProfit,
                    PaidAmount = x.PaidAmount,
                    RemainingAmount = x.RemainingAmount,
                    PaymentStatus = x.PaymentStatus,
                    Notes = x.Notes,

                    PatientId = x.PatientId,
                    PatientName = x.Patient != null
                        ? x.Patient.FirstName + " " + x.Patient.LastName
                        : null,

                    DoctorId = x.DoctorId,
                    DoctorName = x.Doctor != null
                        ? x.Doctor.FirstName + " " + x.Doctor.LastName
                        : null,

                    SaleDetails = x.SaleDetails.Select(d => new SaleDetailsDto
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
            _logger.LogError(ex, "Sale failed");
            throw;
        }
    }



}