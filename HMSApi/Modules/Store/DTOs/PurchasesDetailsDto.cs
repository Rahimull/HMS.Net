namespace HMSApi.Modules.Store.DTOs;


public class PurchaseDetailDto
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public string ItemName { get; set; } = null!;

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public decimal SubTotal { get; set; }

    public string BatchNumber { get; set; } = null!;
    public DateOnly? ExpiryDate { get; set; }
}