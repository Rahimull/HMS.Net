using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

public class StockMovementDto
{
    public int Id { get; set; }

    public int ItemStockId { get; set; }
    public string ItemName { get; set; } = null!;
    public string BatchNumber { get; set; } = null!;

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public StockMovementType Type { get; set; }

    public int? ReferenceId { get; set; }
    public StockReferenceType? ReferenceType { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? Notes { get; set; }
}