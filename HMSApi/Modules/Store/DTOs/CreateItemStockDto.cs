
using System.Text.Json.Serialization;
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;


using System.ComponentModel.DataAnnotations;

public class CreateItemStockDto
{
    [Required]
    public int ItemId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(0, double.MaxValue)]
    public decimal BuyPrice { get; set; }

    public string? BatchNumber { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public string? Notes { get; set; }
     public StockReferenceType? ReferenceType { get; set; }

    public int? ReferenceId { get; set; }
}