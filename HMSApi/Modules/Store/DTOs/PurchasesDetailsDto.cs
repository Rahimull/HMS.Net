namespace HMSApi.Modules.Store.DTOs;


public class PurchaseDetailsDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
    public string? BatchNumber { get; set; }
    public DateOnly? ExpiryDate { get; set; }
    public int PurchaseId { get; set; }
    public int ItemId { get; set; }
    public string? ItemName { get; set; }
    public string? PurchaseName { get; set; }
}