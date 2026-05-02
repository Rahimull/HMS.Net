namespace HMSApi.Modules.Store.DTOs;


using System.ComponentModel.DataAnnotations;

public class CreatePurchaseDetailDto
{
    [Required]
    public int ItemId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(0, double.MaxValue)]
    public decimal UnitPrice { get; set; }

    public string? BatchNumber { get; set; }

    public DateOnly? ExpiryDate { get; set; }
}