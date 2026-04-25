using HMSApi.Common.Enums;
using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class ItemStock : BaseEntity
{
    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int Quantity { get; set; }

    public StockMovementType Type { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;

    public string? BatchNumber { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public string? Notes { get; set; }
}