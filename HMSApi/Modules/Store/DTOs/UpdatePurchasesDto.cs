namespace HMSApi.Modules.Store.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdatePurchaseDto
{
    [Required]
    public int Id { get; set; }

    public DateTime PurchaseDate { get; set; }

    public string? Notes { get; set; }
}