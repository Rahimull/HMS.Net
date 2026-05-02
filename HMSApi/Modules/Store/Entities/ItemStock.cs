
using HMSApi.Common.Enums;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Modules.Store.Entities;

[Index(nameof(ItemId))]
[Index(nameof(BatchNumber))]
public class ItemStock : BaseEntity
{
    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int InitialQuantity { get; set; }
    public int RemainingQuantity { get; set; }

    public decimal BuyPrice { get; set; }

    public string BatchNumber { get; set; } = null!;
    public DateOnly? ExpiryDate { get; set; }

    public string? Notes { get; set; }
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}