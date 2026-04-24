namespace HMSApi.Modules.Store.DTOs;

public class CreatePurchaseDto
{
       public DateTime PurchaseDate { get; set; }
       public string? Notes { get; set; }
       public int SupplierId { get; set; }


       public List<CreatePurchaseDetailsDto> Details { get; set; } = new();
}