namespace HMSApi.Modules.Store.DTOs;


using System.ComponentModel.DataAnnotations;

public class CreatePurchaseDto
{
    [Required]
    public int SupplierId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public string? Notes { get; set; }

    [Required]
    [MinLength(1)]
    public List<CreatePurchaseDetailDto> Details { get; set; } = new();
}
