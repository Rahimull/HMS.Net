namespace HMSApi.Modules.Pharmacy.DTOs;


public class CreateSaleDetailsDto
{
    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public decimal? UnitPrice { get; set; } 
    // optional → اگر null بود از Item گرفته می‌شود

    public decimal Discount { get; set; } = 0;
}