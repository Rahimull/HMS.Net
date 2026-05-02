namespace HMSApi.Modules.Store.DTOs;


using System.ComponentModel.DataAnnotations;

public class UpdatePurchaseDetailDto
{
    [Required]
    public int Id { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(0, double.MaxValue)]
    public decimal UnitPrice { get; set; }

    public string? BatchNumber { get; set; }
    public DateOnly? ExpiryDate { get; set; }
}