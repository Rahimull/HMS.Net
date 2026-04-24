namespace HMSApi.Modules.Store.DTOs;


public class CreatePurchaseDetailsDto
{
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public string? BatchNumber { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public int ItemId { get; set; }
}