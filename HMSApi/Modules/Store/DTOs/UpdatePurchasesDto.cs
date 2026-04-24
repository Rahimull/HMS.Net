namespace HMSApi.Modules.Store.DTOs;


// public record UpdatePurchasesDto(
//        DateTime PurchaseDate,
//        string? Notes,
//        int SupplierId
// );


public class UpdatePurchasesDto
{
    public DateTime PurchaseDate { get; set; }
    public string? Notes { get; set; }
    public int SupplierId { get; set; }

    public List<CreatePurchaseDetailsDto> Details { get; set; } = new();
}