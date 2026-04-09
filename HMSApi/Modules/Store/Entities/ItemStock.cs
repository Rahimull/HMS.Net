using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class ItemStock : BaseEntity
{
   
    public int Quantity { get; set; }
    public string Location { get; set; } = null!;
    public string? BatchNumber { get; set; }
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    public DateOnly ExpiryDate { get; set; }


    // foreign key
    public int ItemId { get; set; }

    // navigation property
    public Items Item { get; set; } = null!;
}