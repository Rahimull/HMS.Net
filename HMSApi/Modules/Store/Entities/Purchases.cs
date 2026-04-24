using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class Purchases : BaseEntity
{

    public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }
    public decimal TotalPrice { get; set; }
    public int SupplierId { get; set; }
    public Suppliers Supplier { get; set; } = null!;
    public ICollection<PurchaseDetail> PurchasesDetails { get; set; } = new List<PurchaseDetail>();


    // public int Quantity { get; set; }


    // foreign key
    // public int ItemId { get; set; }


    // navigation property
    // public Items Item { get; set; } = null!;

}