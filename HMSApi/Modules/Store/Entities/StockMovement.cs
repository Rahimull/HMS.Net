
using HMSApi.Common.Enums;
using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;
public class StockMovement : BaseEntity
{
    public int ItemStockId { get; set; }
    public ItemStock ItemStock { get; set; } = null!;

    public int Quantity { get; set; } // +100, -2
    public decimal UnitPrice { get; set; } // snapshot for report

    public StockMovementType Type { get; set; }

    public int? ReferenceId { get; set; } // مثلا SaleId
    public StockReferenceType? ReferenceType { get; set; } // Sale / Purchase

    public string? Notes { get; set; }
}