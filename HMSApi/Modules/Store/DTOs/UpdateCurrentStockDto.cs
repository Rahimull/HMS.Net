namespace HMSApi.Modules.Store.DTOs;

using System.ComponentModel.DataAnnotations;

public class UpdateCurrentStockDto
{
    [Required]
    public int ItemId { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }
}