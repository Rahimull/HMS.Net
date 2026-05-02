

namespace HMSApi.Modules.Store.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateItemStockDto
{
    [Required]
    public int Id { get; set; }

    [Range(0, int.MaxValue)]
    public int RemainingQuantity { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public string? Notes { get; set; }
}