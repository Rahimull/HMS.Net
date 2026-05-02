namespace HMSApi.Modules.Store.DTOs;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using HMSApi.Common.Enums;

public class CreateStockMovementDto
{
    [Required]
    public int ItemStockId { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal UnitPrice { get; set; }

    [Required]
    public StockMovementType Type { get; set; }

    public int? ReferenceId { get; set; }
    public StockReferenceType? ReferenceType { get; set; }

    public string? Notes { get; set; }
}