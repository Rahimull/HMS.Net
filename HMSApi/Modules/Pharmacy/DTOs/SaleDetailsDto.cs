namespace HMSApi.Modules.Pharmacy.DTOs;

public class SaleDetailsDto
{
    public int Id { get; set; }

    public int ItemId { get; set; }

    public string ItemName { get; set; } = "";

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal Discount { get; set; }

    public decimal TotalPrice { get; set; }

    // 👇 این‌ها از Store می‌آیند
    public string? BatchNumber { get; set; }

    public DateOnly? ExpiryDate { get; set; }
}