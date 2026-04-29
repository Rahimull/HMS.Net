using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;


public class SaleDetails : BaseEntity
{

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }


    // Foreign Keys
    public int SaleId { get; set; }
    public int ItemId { get; set; }
    public Item Item { get; set; }= null!;

    // Navigation properties
    public Sale Sale { get; set; } = null!;
}