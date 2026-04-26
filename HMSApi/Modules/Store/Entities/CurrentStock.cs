


using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;

public class CurrentStock : BaseEntity
{
    public int ItemId { get; set; } 
    public Item Item { get; set; } = null!;
    public int Quantity { get; set; }
    public DateTime LastUpdate { get; set; } = DateTime.UtcNow;
}