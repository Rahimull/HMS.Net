namespace HMSApi.Modules.Pharmacy.DTOs;


public class UpdateSaleDetailsDto
{
    public int? Id { get; set; } // اگر null → new item

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public decimal? UnitPrice { get; set; }

    public decimal Discount { get; set; } = 0;
}