using HMSApi.Models;

namespace HMSApi.Modules.Store.Entities;


public class PurchasesDetails : BaseEntity
{
   
  
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
    public string? BatchNumber { get; set; }
    public DateOnly ExpiryDate { get; set; }

    // foreign key
    public int PurchaseId { get; set; }
    public int ItemId1 { get; set; }
}