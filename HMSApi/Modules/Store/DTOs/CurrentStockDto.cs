namespace HMSApi.Modules.Store.DTOs;

public class CurrentStockDto
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public string ItemName { get; set; } = null!;

    public string? Code { get; set; }
    public string? Barcode { get; set; }

    public int Quantity { get; set; }

    public DateTime LastUpdate { get; set; }
}