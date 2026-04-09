using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class Items : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string? Description { get; set; }
    public string Unit { get; set; } = null!;
    public decimal Price { get; set; }
    public int QuantityInStock { get; set; }

    public ICollection<ItemStock> ItemStocks { get; set; } = new List<ItemStock>();
}