using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class Purchases : BaseEntity
{
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }

    // foreign key
    public int ItemId { get; set; }
    public int SupplierId { get; set; }

    // navigation property
    public Items Item { get; set; } = null!;
    public Suppliers Supplier { get; set; } = null!;
}