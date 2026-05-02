
namespace HMSApi.Modules.Store.DTOs;
using HMSApi.Common.Enums;

public class ItemStockDto
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public string ItemName { get; set; } = null!;

    public string BatchNumber { get; set; } = null!;

    public int InitialQuantity { get; set; }
    public int RemainingQuantity { get; set; }

    public decimal BuyPrice { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public bool IsExpired { get; set; }

    public string? Notes { get; set; }
}