using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;

public class PurchaseDetail : BaseEntity
{
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal => Quantity * UnitPrice;
    public string? BatchNumber { get; set; }
    public DateOnly ExpiryDate { get; set; }

    public int PurchaseId { get; set; }
    public Purchases Purchase { get; set; } = null!;

    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;
}