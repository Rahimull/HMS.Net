namespace HMSApi.Modules.Store.DTOs;


public class PurchasesDto
{
    public int Id { get; set; }

    public DateTime PurchaseDate { get; set; }

    public string? Notes { get; set; }

    public decimal TotalPrice { get; set; }

    public int SupplierId { get; set; }
    public string SupplierName { get; set; } = null!;

    public List<PurchaseDetailDto> Details { get; set; } = new();
}
