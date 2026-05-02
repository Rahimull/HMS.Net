using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Pharmacy.Entities;


public class SaleDetails : BaseEntity
{

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal UnitPrice { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal BuyPrice { get; set; }
   

    [Column(TypeName = "decimal(18,2)")]
    public decimal Discount { get; set; } = 0;

     public decimal TotalPrice => (UnitPrice * Quantity) - Discount; // Total Price
    public decimal Profit => (TotalPrice - (BuyPrice * Quantity)); // Profit
   
    // Foreign Keys
    public int SaleId { get; set; }
    public int ItemId { get; set; }
    public int ItemStockId { get; set; }
    public Item Item { get; set; }= null!; 
    public ItemStock ItemStock { get; set; } = null!;



    // Navigation properties
    public Sale Sale { get; set; } = null!;
}