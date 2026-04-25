
namespace HMSApi.Modules.Store.DTOs;

public record ItemStockDto(
        int Id,
    int ItemId,
    string ItemName,
    int Quantity,
    string Type,
    DateTime Date,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes
);