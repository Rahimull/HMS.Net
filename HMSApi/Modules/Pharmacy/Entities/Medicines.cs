using HMSApi.Models;

namespace HMSApi.Modules.Pharmacy.Entities;


public class Medicines : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? GenericName { get; set; }
    public string Unit { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
}